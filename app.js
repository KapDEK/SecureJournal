let entries = JSON.parse(localStorage.getItem('entries')) || [];
let isNewEntry = true;

function scramble(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key);
    }
    return result;
}

function descramble(text, key) {
    return scramble(text, key); 
}

function updateEntrySelect(entries, selectedIndex = null) {
    const entrySelect = document.getElementById('entrySelect');
    entrySelect.innerHTML = '';
    entries.forEach((entry, index) => {
        const option = document.createElement('option');
        option.textContent = entry.title;
        option.value = index;
        entrySelect.appendChild(option);
    });
    if (selectedIndex !== null) {
        entrySelect.selectedIndex = selectedIndex;
    }
}

document.getElementById('saveButton').addEventListener('click', function() {
    const entryTitle = document.getElementById('entryTitle').value;
    const entryText = document.getElementById('entry').value;
    const key = document.getElementById('key').value;

    if (entryTitle && entryText && key) {
        if (entries.some(entry => entry.title === entryTitle)) {
            document.getElementById('message').innerText = 'Entry title already exists. Please use a unique title.';
        } else {
            const scrambled = scramble(entryText, Number(key));
            entries.push({ title: entryTitle, text: scrambled, key });
            localStorage.setItem('entries', JSON.stringify(entries));
            updateEntrySelect(entries, entries.length - 1);
            document.getElementById('message').innerText = 'Entry saved successfully!';
            isNewEntry = false;
        }
    } else {
        document.getElementById('message').innerText = 'Please enter an entry title, entry text, and a key.';
    }
});

document.getElementById('loadButton').addEventListener('click', function() {
    const selectedIndex = document.getElementById('entrySelect').value;
    let entry = entries[selectedIndex];
    if (entry) {
        document.getElementById('entryTitle').value = entry.title;
        document.getElementById('entry').value = entry.text;
        document.getElementById('message').innerText = 'Entry loaded successfully!';
        isNewEntry = false;
    } else {
        document.getElementById('message').innerText = 'No entry selected.';
    }
});

document.getElementById('key').addEventListener('input', function() {
    const selectedIndex = document.getElementById('entrySelect').value;
    let entry = entries[selectedIndex];
    const key = document.getElementById('key').value;
    if (entry && !isNewEntry) {
        document.getElementById('entry').value = descramble(entry.text, Number(key));
    }
});

document.getElementById('newButton').addEventListener('click', function() {
    isNewEntry = true;  
    document.getElementById('entryTitle').value = '';
    document.getElementById('entry').value = '';
    document.getElementById('key').value = '';  
    document.getElementById('message').innerText = 'New entry. Fill the fields and hit "Save Entry".';
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const selectedIndex = document.getElementById('entrySelect').value;
    entries.splice(selectedIndex, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    updateEntrySelect(entries);
    document.getElementById('message').innerText = 'Entry deleted successfully!';
});

document.getElementById('renameButton').addEventListener('click', function() {
    const selectedIndex = document.getElementById('entrySelect').value;
    const newTitle = document.getElementById('entryTitle').value;
    let entry = entries[selectedIndex];

    if (entries.some(e => e.title === newTitle)) {
        document.getElementById('message').innerText = 'Entry title already exists. Please use a unique title.';
    } else if (entry) {
        entry.title = newTitle;
        localStorage.setItem('entries', JSON.stringify(entries));
        updateEntrySelect(entries, selectedIndex);
        document.getElementById('message').innerText = 'Entry renamed successfully!';
    } else {
        document.getElementById('message').innerText = 'No entry selected.';
    }
});

document.getElementById('key').addEventListener('input', function() {
    if (isNewEntry) {
        document.getElementById('saveButton').style.display = 'inline';
    } else {
        document.getElementById('saveButton').style.display = 'none';
    }
});

window.onload = function() {
    updateEntrySelect(entries);
};
