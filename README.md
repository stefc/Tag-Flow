### Description:

The "Tag Flow" plugin for Obsidian serves as a tool to streamline the generation and administration of note lists based on specific tags, while maintaining the outgoing links functionality. This plugin automatically crafts and refreshes these lists within a user's note, offering a live, simple-to-navigate view of all notes associated with a certain tag. Importantly, all data pertaining to the lists is safely stored in a JSON file within the user's vault.

### Technical Description
The plugin serves as a dynamic note linker within Obsidian. It creates lists of notes based on selected tags, with each list identified by a unique ID. The tags can be selected from a modal, and the lists are created at the cursor's location in the active note. The lists are surrounded by start and end anchors that include the unique ID. The plugin is capable of creating multiple lists with the same or different tags in the same note, and each list operates independently.

The plugin is designed to constantly update the lists based on the workspace layout, active leaf changes (Switching between notes or views), new list creation, file saves, and Obsidian opening and closing. These updates ensure the lists always contain all notes associated with their respective tags.

The plugin persists its data, including the tag, unique ID, and note path for each list, in a JSON file. This ensures the lists remain consistent between Obsidian sessions. If the data file is missing or corrupted, the plugin is designed to handle such situations.

The plugin also includes a list deletion function that allows users to delete a list either through a dedicated deletion function or manually. When a list is deleted, it is removed from both the note and the stored data.

File changes trigger updates to all tags and lists, ensuring the plugin is always up to date with the latest state of the notes. The plugin also handles errors, logging them for easier debugging.

Performance is a key concern, and the plugin is designed to operate efficiently with both small and large numbers of notes and tags. It is also designed to be compatible with other plugins and integrates well with the Obsidian interface.

Lastly, the plugin should also support front matter, recognizing tags from both the note content and front matter.

### Functionalities:

1. **Tag Selection Modal**: The plugin provides a modal window to select a tag from all existing tags in the vault. The selected tag is then used to create a new list in the active note.
    
2. **List Creation**: The plugin creates a list of links to all notes tagged with the selected keyword. The list is inserted at the cursor's location in the active note. Each list is associated with a unique ID to support multiple lists of the same tag in a single note.
    
3. **List Updating**: The plugin automatically updates the created lists based on various triggers such as a change in workspace layout, an active leaf change, a new list creation, a file save, and Obsidian's open and close. The updated list contains links to all notes with the list's tag.
    
4. **Data Persistence**: The plugin saves data, including the tag, unique ID, and note path for each list, to ensure that the state is maintained between sessions. When Obsidian is reopened, the plugin loads the saved data to restore all lists.
    
5. **List Deletion**: The plugin allows users to delete lists. When invoked, it opens a modal displaying all lists in the current note identified by their tags and unique IDs. The selected list is removed from the note and the stored data.
    
6. **File Change Handling**: The plugin listens for file changes and updates the list of all tags in the vault. If the changed file contains a list, the plugin updates that list accordingly.
    
7. **Error Handling**: The plugin has built-in error handling to catch and log potential errors, particularly during the data loading process.
    
8. **Integration with Obsidian Interface**: The plugin's commands are integrated into Obsidian's command palette for easy access and usability.
    

This plugin is designed to be a robust and helpful tool for managing and navigating notes based on tags within the Obsidian environment, improving the user's productivity and note-taking experience.


### Debugging 

#### 1. Tag Selection Modal
   - [ ] Verify that the tag selection modal displays all the tags correctly.
   - [ ] Check the behavior when a tag is selected (It should trigger list creation and create a list).
   - [ ] Verify the modal's behavior on opening and closing.
   - [ ] Test the modal's behavior with no tags available (Should alert, no tags in vault)
   - [ ] Tags should be recognized from the note and from the note front matter

#### 2. List Creation
   - [ ] Check the list creation when a tag is selected from the modal.
   - [ ] Verify that the list contains links to all notes with the selected tag.
   - [ ] Check the location of the created list in the active note (should be at the cursor's location).
   - [ ] Ensure the list is enclosed within the correct start and end anchors.
   - [ ] Test list creation with various tags and notes.
   - [ ] Verify the list creation with a tag that has no associated notes.

#### 3. Unique ID
   - [ ] Ensure each list is associated with a unique ID.
   - [ ] Verify that the unique ID is included in the start and end anchors.
   - [ ] Check that the unique ID is correctly stored in the plugin's data.
   - [ ] Ensure each tag is associated with a unique ID. This is to prevent tags that start with the same letters, for example: #un #unity 

#### 4. Multiple Lists in a Note
   - [ ] Test creating multiple lists in the same note.
   - [ ] Test creating lists with the same tag in the same note, there should be no problem with creating multiple lists of the same tag on the same note.
   - [ ] Ensure each list is independent and updates correctly.

#### 5. List Updating
   - [ ] Check the list updating when there is a change in the workspace layout (moving between notes, moving over to graph view)
   - [ ] Verify the list updating when the active leaf changes.
   - [ ] Check the list updating when a new list is created.
   - [ ] Test the list updating when a file is saved.
   - [ ] Verify the list updating on Obsidian's open and close.
   - [ ] Ensure the updated list contains links to all notes with the list's tag.
   - [ ] Ensure that the JSON file is updating with the relevant data.

#### 6. Data Persistence
   - [ ] Check whether the plugin saves the data correctly.
   - [ ] Verify that the saved data includes the tag, unique ID, and note path for each list.
   - [ ] Test the plugin's behavior after closing and reopening Obsidian. The plugin should load the data and all lists should be as they were before closing.
   - [ ] Check the plugin's behavior with an empty data file.
   - [ ] Test the plugin's behavior with a corrupted data file.
   - [ ] Plugin should create a JSON file when there is none in the folder

#### 7. List Deletion
   - [ ] Check the list deletion function.
   - [ ] Verify that a modal opens displaying all lists in the current note, identified by their tags and unique IDs.
   - [ ] Test the deletion of a list. The list should be removed from the note and the stored data.
   - [ ] Test deleting the last list in a note.
   - [ ] Test deleting a list from a note with multiple lists.
   - [ ] Test the deletion of data from JSON file
   - [ ] Test deleting list manually, when deleting the list manually there should be one of two options (whatever is more performance efficient). 
         1. Alert the user that he cannot delete list manually, only by using the delete function (and don't remove the list from the note)
         2. Delete the list from the note.

#### 8. File Change Handling
   - [ ] Check how the plugin handles file changes.
   - [ ] Verify the plugin updates all tags from the vault.
   - [ ] Check the plugin updates all lists if the changed file contains a list.
   - [ ] Test file change handling with various file contents and changes.
   - [ ] Check if list updates correctly when note was assigned with a tag and then changed to another tag

#### 9. Error Handling
   - [ ] Test the plugin's error handling by manually creating errors, such as corrupting the data file.
   - [ ] Verify the plugin catches and logs the error correctly.

#### 10. Performance
   - [ ] Check the plugin's performance with a small number of notes and tags.
   - [ ] Verify the plugin's performance with a large number of notes and tags.
   - [ ] Test the plugin's performance during intensive operations such as bulk list updating or file changes.

#### 11. Compatibility with Other Plugins
   - [ ] Test the plugin with other plugins enabled.
   - [ ] Check for any conflicts or issues caused by the interaction of this plugin with others.

#### 12. User Interface and Experience
   - [ ] Check the plugin's integration with Obsidian's interface.
   - [ ] Verify the plugin's commands appear correctly in the command palette.
   - [ ] Test the plugin's responsiveness and ease of use.

#### 13. Front Matter Support
   - [ ] Verify that the plugin correctly recognizes tags from front matter.

### Technical Description
The plugin serves as a dynamic note linker within Obsidian. It creates lists of notes based on selected tags, with each list identified by a unique ID. The tags can be selected from a modal, and the lists are created at the cursor's location in the active note. The lists are surrounded by start and end anchors that include the unique ID. The plugin is capable of creating multiple lists with the same or different tags in the same note, and each list operates independently.

The plugin is designed to constantly update the lists based on the workspace layout, active leaf changes (Switching between notes or views), new list creation, file saves, and Obsidian opening and closing. These updates ensure the lists always contain all notes associated with their respective tags.

The plugin persists its data, including the tag, unique ID, and note path for each list, in a JSON file. This ensures the lists remain consistent between Obsidian sessions. If the data file is missing or corrupted, the plugin is designed to handle such situations.

The plugin also includes a list deletion function that allows users to delete a list either through a dedicated deletion function or manually. When a list is deleted, it is removed from both the note and the stored data.

File changes trigger updates to all tags and lists, ensuring the plugin is always up to date with the latest state of the notes. The plugin also handles errors, logging them for easier debugging.

Performance is a key concern, and the plugin is designed to operate efficiently with both small and large numbers of notes and tags. It is also designed to be compatible with other plugins and integrates well with the Obsidian interface.

Lastly, the plugin should also support front matter, recognizing tags from both the note content and front matter.
