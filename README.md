# Very Safe Journal

Very Safe Journal is a web-based journal application that encrypts your entries to ensure they remain private.


## How It Works

The Very Safe Journal operates using client-side JavaScript. When a user creates a journal entry, they provide a unique title, the content for the entry, and a numerical key. This key is used to encode the content using a simple XOR cipher. The encoded content and key are stored in the browser's local storage.

When a user wants to view a saved entry, they select the title of the entry and provide the key. If the correct key is used, the content of the entry is decoded and displayed. If the incorrect key is used, the content will appear scrambled. This way, even if someone else accesses your saved entries, they cannot read them without the correct key.

## How to Access
The Journal is at my Github Pages, and is running on the Stable Branch

## Features

* Add journal entries with unique titles
* Each entry is encrypted with a user-provided key
* Encrypted entries are saved to local storage
* Load and view encrypted entries with the correct key
* Rename or delete entries

## Usage

### Adding a New Entry

1. Enter a unique title for the entry.
2. Write your journal entry.
3. Provide a key that will be used to encrypt the entry.
4. Click 'Save Entry'.

### Loading an Entry

1. Select an entry from the 'Saved Entries' dropdown.
2. Provide the key that was used to encrypt the entry.
3. Click 'Load Entry'.

### Renaming an Entry

1. Select an entry from the 'Saved Entries' dropdown.
2. Enter a new title for the entry.
3. Click 'Rename Entry'.

### Deleting an Entry

1. Select an entry from the 'Saved Entries' dropdown.
2. Click 'Delete Entry'.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


