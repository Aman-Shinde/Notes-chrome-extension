document.getElementById("toggle").addEventListener("click", toggleMode);
document.getElementById("new_note_button").addEventListener("click", getNewNoteData);

function toggleMode() {
    var buttonClass = document.getElementById('main').className;
    if (buttonClass.includes('dark-mode')) {
        document.getElementById('main').className = 'main-container';
    }
    else {
        document.getElementById('main').className = buttonClass + " dark-mode";
    }
}

const notesContainer = document.querySelector('.notes-container');

//main function to each and every function 
function main() {
    if (!window.localStorage.getItem('note')) {
        window.localStorage.setItem('note', JSON.stringify({ "data_cn": [{ id: '1', timeStamp: '', text: 'Hi' },] }))
    }
    loadUi();
}

//Takes data as an argument and add it to the localstorage
function addNewNote(new_note_text) {
    var notes = getAllNotes();
    var new_note = { id: uniqueId(), timeStamp: '', text: new_note_text }
    localStorage.setItem('note', JSON.stringify({ "data_cn": [new_note, ...notes.data_cn] }))
    loadUi();
}

function deleteNote() {
    var notesList = getAllNotes();
    var newNotesList = notesList.data_cn.filter(noteItem => noteItem.id != this.id);
    if (newNotesList) {
        localStorage.setItem('note', JSON.stringify({ "data_cn": [...newNotesList] }));
    }
    else {
        localStorage.setItem('note', JSON.stringify({ "data_cn": [] }));
    }
    loadUi();
}

//gets input value on button click
function getNewNoteData() {
    var new_note_text = document.getElementById("note_text").value;
    document.getElementById("note_text").value = '';
    addNewNote(new_note_text);
}

function getAllNotes() {
    return JSON.parse(window.localStorage.getItem('note'));
}

function uniqueId() {
    var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    var id = components.join("");
    return id;
}

function loadUi() {
    var noteList = getAllNotes();
    if (noteList.data_cn.length > 0) {
        notesContainer.innerHTML = '';
        noteList.data_cn.forEach((noteItem) => {
            var newNoteHTML = `            
            <div class='note' >
                <span> ${noteItem.text}</span>
                <div class="note-footer">
                    <button class='button delete' id='${noteItem.id}'>Delete</button>
                </div>
            </div>`;

            notesContainer.innerHTML = notesContainer.innerHTML + newNoteHTML;
        })

        notesContainer.querySelectorAll(".delete").forEach(noteListItem => {
            noteListItem.addEventListener("click", deleteNote)
        })
    }
    else {
        notesContainer.innerHTML = '';
    }
}

main()