document.getElementById("toggle").addEventListener('click', () => {
    document.querySelector('body').classList.toggle('body-dark-mode');
});

// Function to update a note
function updateNote(noteId, updatedTitle, updatedDescription) {
    chrome.storage.local.get({ notes: [] }, function (result) {
        const existingNotes = result.notes;

        // Find the index of the note to be updated
        const noteIndex = existingNotes.findIndex(note => note.id === noteId);

        if (noteIndex !== -1) {
            // Update the note with the new values
            existingNotes[noteIndex].title = updatedTitle;
            existingNotes[noteIndex].description = updatedDescription;

            // Save the updated notes back to storage
            chrome.storage.local.set({ notes: existingNotes }, function () {
                console.log('Note updated successfully.');
                // Refresh the notes list
                displayNotes();
            });
        } else {
            console.log('Note not found for ID:', noteId);
        }
    });
}

// Function to delete a note from local storage
function deleteNote(noteId) {
    chrome.storage.local.get({ notes: [] }, function (result) {
      const existingNotes = result.notes;
  
      // Filter out the note to be deleted
      const updatedNotes = existingNotes.filter(note => note.id !== noteId);
  
      // Save the updated notes back to local storage
      chrome.storage.local.set({ notes: updatedNotes }, function () {
        console.log('Note deleted successfully.');
        // Refresh the notes list
        displayNotes();
      });
    });
  }
  

function noteEditClickHandler(noteCard) {
    const noteId = noteCard.id;
    console.log("Id of editable note is:    ", noteId);
    const noteTitle = noteCard.querySelector('.note-card-header p');
    const noteContent = noteCard.querySelector('.note-card-content p');
    const editButton = noteCard.querySelector('.note-card-footer .edit-icon');

    noteCard.classList.toggle('edit-mode');
    noteTitle.contentEditable = !noteTitle.isContentEditable;
    noteContent.contentEditable = !noteContent.isContentEditable;

    noteTitle.classList.toggle('black-border');
    noteContent.classList.toggle('black-border');


    if (noteCard.classList.contains('edit-mode')) {
        editButton.textContent = 'done';
    } else {
        editButton.textContent = 'edit';
        const updatedTitleField = document.getElementById(noteId).querySelector('.note-card-header p').innerText;
        const updatedContentField = document.getElementById(noteId).querySelector('.note-card-content p').innerText;

        updateNote(Number(noteId), updatedTitleField, updatedContentField);
    }

    if (noteContent.isContentEditable) {
        noteContent.focus();
    }
}

// Function to save a note
function saveNote() {
    let noteTitle = document.getElementById('noteTitle').value;
    let noteDescription = document.getElementById('noteDescription').value;

    noteTitle = noteTitle.trim();
    noteDescription = noteDescription.trim();

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDescription').value = '';

    if (noteTitle && noteDescription) {
        // Generate a unique note ID (you might want to use a more robust method in a production extension)
        const noteId = new Date().getTime();

        // Retrieve existing notes from storage
        chrome.storage.local.get({ notes: [] }, function (result) {
            const existingNotes = result.notes;

            // Add the new note
            existingNotes.push({ id: noteId, title: noteTitle, description: noteDescription });

            // Save the updated notes back to storage
            chrome.storage.local.set({ notes: existingNotes }, function () {
                console.log('Note saved successfully.');
                // Refresh the notes list
                displayNotes();
            });
        });
    } else {
        console.log('Please enter both note title and description.');
    }
}

// Function to retrieve all notes from storage and display them
function displayNotes() {
    const notesList = document.getElementById('notesList');

    // Retrieve notes from storage
    chrome.storage.local.get({ notes: [] }, function (result) {
        const notes = result.notes;

        const reversedNotes = notes.slice().reverse();

        // Clear the existing list
        notesList.innerHTML = '';

        // Display each note in the list
        reversedNotes.forEach(function (note) {

            const noteParentDiv = document.createElement('div');
            noteParentDiv.classList.add('note-card');
            noteParentDiv.setAttribute('id', note.id)

            const noteHeaderDiv = document.createElement('div');
            noteHeaderDiv.classList.add('note-card-header');

            const noteContentDiv = document.createElement('div');
            noteContentDiv.classList.add('note-card-content');

            const noteFooterDiv = document.createElement('div');
            noteFooterDiv.classList.add('note-card-footer');

            const noteTitle = document.createElement('p');
            noteTitle.classList.add('note-title');
            noteTitle.textContent = note.title;

            const noteContent = document.createElement('p');
            noteContent.classList.add('note-content');
            noteContent.textContent = note.description;

            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            const editItag = document.createElement('i');
            editItag.classList.add('material-icons');
            editItag.classList.add('edit-icon');
            editItag.textContent = 'edit';

            const deleteItag = document.createElement('i');
            deleteItag.classList.add('material-icons');
            deleteItag.textContent = 'delete';

            editButton.appendChild(editItag);
            deleteButton.appendChild(deleteItag);

            noteFooterDiv.appendChild(editButton);
            noteFooterDiv.appendChild(deleteButton);

            noteContentDiv.appendChild(noteContent);

            noteHeaderDiv.appendChild(noteTitle);

            noteParentDiv.appendChild(noteHeaderDiv);
            noteParentDiv.appendChild(noteContentDiv);
            noteParentDiv.appendChild(noteFooterDiv);

            editButton.addEventListener('click', function () {
                noteEditClickHandler(noteParentDiv);
            });
            deleteButton.addEventListener('click', function () {
                deleteNote(note.id);
            });

            notesList.appendChild(noteParentDiv);
        });
    });
}

displayNotes();

// Attach the saveNote function to the button click event
document.getElementById('saveNoteButton').addEventListener('click', saveNote);
