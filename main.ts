import { App, Plugin, MarkdownView, FuzzySuggestModal, TFile, Modal, Notice } from 'obsidian';

interface TagList {
  tag: string;
  notePath: string;
  id: number;  // Timestamp when the list was created
}

class DeleteListModal extends FuzzySuggestModal<TagList> {
  plugin: TagFlowPlugin;

  constructor(app: App, plugin: TagFlowPlugin) {
    super(app);
    this.plugin = plugin;
  }

  getItems(): TagList[] {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    return activeView ? this.plugin.lists.filter(list => list.notePath === activeView.file.path) : [];
  }

  getItemText(item: TagList): string {
    console.log("Item ID:", item.id);
    return `${item.tag} (ID: ${item.id})`;  
  }

  onChooseItem(item: TagList) {
    this.plugin.deleteList(item);
  }
}

class TagSuggester extends FuzzySuggestModal<string> {
  tags: string[];
  plugin: TagFlowPlugin;

  constructor(app: App, plugin: TagFlowPlugin, tags: string[]) {
    super(app);
    this.tags = tags;
    this.plugin = plugin;
  }

  getItems(): string[] {
    return this.tags;
  }

  getItemText(item: string): string {
    return item;
  }

  onChooseItem(item: string) {
    this.plugin.handleTagSelection(item);
  }
}

export default class TagFlowPlugin extends Plugin {
  allTags: string[] = [];
  lists: TagList[] = [];

  async onload() {
    console.log("Plugin loaded");
    this.allTags = await this.fetchAllTags();

    this.registerCodeMirror((cm: CodeMirror.Editor) => {
      cm.on("change", this.handleFileChange.bind(this));
    });

    this.addCommand({
      id: 'delete-current-list',
      name: 'Delete Current List',
      callback: () => new DeleteListModal(this.app, this).open()
    });

    this.addCommand({
      id: 'open-tag-flow',
      name: 'Open Tag Flow',
      callback: () => this.createTagList()
    });

    this.app.workspace.on('active-leaf-change', () => {
      this.updateLists();
    });

    this.app.workspace.on('layout-change', () => {
      if (this.app.workspace.getLeavesOfType('graph').length > 0) {
        this.updateLists();
      }
    });        

    setInterval(() => {
      this.updateLists();
    }, 60 * 60 * 1000);

    this.app.workspace.onLayoutReady(() => {
      this.loadData();
    });

    this.updateLists();
  }

  async deleteList(list: TagList) {
    let note = this.app.vault.getAbstractFileByPath(list.notePath) as TFile;
    let content = await this.app.vault.read(note);
    const startAnchor = `<!--tag-list ${list.tag} ${list.id}-->`;
    const endAnchor = `<!--end-tag-list ${list.tag} ${list.id}-->`;
    const startIndex = content.indexOf(startAnchor);
    const endIndex = content.indexOf(endAnchor);
    if (startIndex >= 0) {
        if (endIndex >= 0) {
            // If the end anchor exists, delete the content between start and end anchors
            content = content.substring(0, startIndex) + content.substring(endIndex + endAnchor.length);
        } else {
            // If the end anchor does not exist, only delete the content from start anchor to the next line
            const nextLineIndex = content.indexOf('\n', startIndex);
            content = content.substring(0, startIndex) + content.substring(nextLineIndex + 1);
        }
        await this.app.vault.modify(note, content);

        // Remove the list from the plugin's lists
        this.lists = this.lists.filter(l => l !== list);

        // Save the data
        await this.saveData();
    }
}


  async fetchAllTags() {
    const allTags = new Set<string>();
    for (const file of this.app.vault.getMarkdownFiles()) {
      const fileContent = await this.app.vault.cachedRead(file);
      const tagRegex = /#([a-zA-Z0-9_-]+)/g;
      let match;
      while (match = tagRegex.exec(fileContent)) {
        allTags.add(match[1]);
      }
    }
    return Array.from(allTags);
  }

  async createTagList() {
    this.allTags = await this.fetchAllTags();
    if (this.allTags.length > 0) {
      new TagSuggester(this.app, this, this.allTags).open();
    }
  }

  async handleTagSelection(tag: string) {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (activeView) {
        const activeEditor = activeView.editor;
        const cursor = activeEditor.getCursor();
        const id = Date.now();
        activeEditor.replaceRange(`<!--tag-list #${tag} ${id}-->\n<!--end-tag-list #${tag} ${id}-->\n`, cursor);
        this.lists.push({
            tag: `#${tag}`,
            notePath: activeView.file.path,
            id: id
        });
        await this.updateLists();
        await this.saveData();
    }
}

  async handleFileChange(change: any) {
    const file = this.app.vault.getAbstractFileByPath(change.doc.file.path);
    if (file instanceof TFile) {
      this.allTags = await this.fetchAllTags();
      const content = await this.app.vault.read(file);
      if (content.includes('<!--tag-list')) {
        await this.updateLists();
      }
    }
  }




  async updateLists() {
    if (!this.lists.length) {
        return;
    }

    for (let list of this.lists) {
        const filesWithTag = (await Promise.all(
            this.app.vault.getMarkdownFiles().map(async file => {
                const content = await this.app.vault.read(file);
                return content.includes(list.tag) ? file : null;
            })
        )).filter(Boolean) as TFile[];

        const links = filesWithTag.map(file => `[[${file.basename}]]`).join('\n');

        let note = this.app.vault.getAbstractFileByPath(list.notePath) as TFile;
        let content = await this.app.vault.read(note);
        const startAnchor = `<!--tag-list ${list.tag} ${list.id}-->`;
        const endAnchor = `<!--end-tag-list ${list.tag} ${list.id}-->`;
        const startIndex = content.indexOf(startAnchor);
        const endIndex = content.indexOf(endAnchor);
        if (startIndex >= 0) {
            if (endIndex >= 0) {
                // If the end anchor exists, replace the content between start and end anchors
                content = content.substring(0, startIndex) + startAnchor + "\n" + links + "\n" + endAnchor + content.substring(endIndex + endAnchor.length);
            } else {
                // If the end anchor does not exist, insert it after the list
                content = content.substring(0, startIndex) + startAnchor + "\n" + links + "\n" + endAnchor + content.substring(startIndex + startAnchor.length);
            }
            await this.app.vault.modify(note, content);
        }
    }
}



  async saveData() {
    const data = {
      lists: this.lists.map(list => ({ tag: list.tag, notePath: list.notePath, id: list.id })),
  };
  }

  async loadData() {
    try {
      const content = await this.app.vault.adapter.read('tagFlowData.json');
      const data = JSON.parse(content);

      this.lists = data.lists.map((listData: {tag: string, notePath: string, id: number}) => ({ tag: listData.tag, notePath: listData.notePath, id: listData.id }));

    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  onunload() {
    console.log('unloading plugin');
  }
}
