# Tag Flow for Obsidian

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Donate-yellow.svg)]( https://www.buymeacoffee.com/taialt )
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]( https://opensource.org/licenses/MIT )  
![Status: Beta](https://img.shields.io/badge/Status-Beta-orange)

## Status: Beta Version
:warning: This plugin is currently in beta. While it is functional and has been tested to work well, please be aware that some features are still under development and may not be fully stable.

Streamline the generation and administration of note lists based on specific tags within Obsidian:

- Tag Selection Modal
	  Displays all available tags in the vault.
	  Selecting a tag triggers list creation.
- List Creation
	  Creates a list of notes tagged with the selected tag.
	  Inserts list at the cursor's location in the active note.
- List Updating
	  Automatically updates the created lists based on various triggers like active leaf changes, file saves, and Obsidian's open and close.
- Data Persistence
	  Saves data in a JSON file to maintain state between Obsidian sessions.
- List Deletion
	  Allows users to delete a list via a dedicated function or manually.
- File Change Handling
	  Listens for file changes and updates all tags and lists accordingly.
- Front Matter Support
- File Change Handling
	  Listens for file changes and updates all tags and lists accordingly.

## Demo

![2023-08-26 10-52-21](https://github.com/Taialt97/Tag-Flow/assets/45160819/5346c595-ea93-446a-bc09-565237b24646)

## How to Use

To create a new tag-based list in your active note, open the Tag Selection Modal via Obsidian's command palette.  Navigate to Tag Flow, Choose your desired tag, and a new list will be inserted at your cursor's location.

## Coming Soon: Planned Features

The following are features we plan to implement in upcoming versions. Your feedback and contributions are welcome!

### 1. Adding All Tags List:

- **Description**: Maintain and display a list of all unique tags within the system.
- **Implementation**:
    - Maintain a set or array to store all unique tags.
    - Provide a UI element to display this list.
    - Consider performance optimization if the number of tags is large.

### 2. Adding Nested Tags:

- **Description**: Support tags in the format `{{nameOfNote/NameOfNote}}`, allowing nested categorization.
- **Implementation**:
    - Update the tag parsing logic to recognize nested tags.
    - Consider how to display and interact with nested tags in the UI.
    - Ensure compatibility with existing tag functionalities.

### 3. Getter Header for Inline Tags:

- **Description**: Provide the ability to link to a specific tag within the content (not in YAML/front matter).
- **Implementation**:
    - Extend the tag parsing logic to recognize inline tags.
    - Implement linking functionality to navigate to specific inline tags.
    - Consider UI/UX design for displaying and interacting with inline tags.

### 4. Integration with Templates:

- **Description**: Ensure the plugin works with Obsidian's templates.
- **Implementation**:
    - Identify the specific issues preventing integration with templates.
    - Implement fixes or adjustments to ensure compatibility.
    - Test with various template scenarios to ensure robustness.

### 5. Link to Specific Tag in Document:

- **Description**: Enable linking to a specific tag within a document, navigating to the exact location.
- **Implementation**:
    - Enhance the tag linking logic to include the exact position within the document.
    - Provide UI controls to facilitate this navigation.
    - Ensure smooth navigation and highlight the target tag.

### 6. User-Selectable List Types:

- **Description**: Allow users to choose different types of tag lists (Simple List, Expanded List, Front Matter Only, Simple Inline, Expanded Inline).
- **Implementation**:
    - Define the behavior and structure of each list type.
    - Implement UI controls for users to select the desired list type.
    - Update the list creation and display logic to accommodate the selected type.

## Notes

Performance is a key concern, and this plugin is optimized for both small and large numbers of notes and tags.

## Contributions

If you find this plugin useful and wish to contribute or report bugs, feel free to open an issue on the GitHub repository.
You can also support by [Buy me a coffee](https://www.buymeacoffee.com/taialt)

MIT License

Copyright (c) [2023] [Tai Alt]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
