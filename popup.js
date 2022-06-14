document.getElementById("toggle").addEventListener("click", toggleMode);
document.getElementById("new_note_button").addEventListener("click", getNewNoteData);

function toggleMode() {
    var button_class = document.getElementById('main').className;
    if (button_class.includes('dark-mode')) {
        document.getElementById('main').className = 'main-container';
    }
    else {
        document.getElementById('main').className = button_class + " dark-mode";
    }
}

const notesContainer = document.querySelector('.notes-container');

//main function to each and every function 
function main() {

    if (!window.localStorage.getItem('note')) {
        window.localStorage.setItem('note', JSON.stringify({ "data_cn": [{id:'1',timeStamp:'',text:'Hi'},] }))
    }

    updateUi();
}

//Takes note as an argument and add necessary code on frontend
function displayNote(note, newNote = false) {
    let newNoteHTML = `            
    <div class='note'>
        <span> ${note}</span>
        <div class="note-footer">
            <button class='button delete'>Delete</button>
        </div>
    </div>`;
    if (newNote) {
        notesContainer.innerHTML = newNoteHTML + notesContainer.innerHTML;
    }
    else {
        notesContainer.innerHTML = notesContainer.innerHTML + newNoteHTML;
    }
};

//Retrive notes from localstorage and call displaynote function with note-text as an arggument
function updateUi(newNote = false) {

    var notes = getAllNotes();
    if (newNote) {
        displayNote(notes.data_cn[0].text, true);
    }
    else {
        notes.data_cn.forEach(note => {
            console.log(note.text);
            displayNote(note.text);
        });
    }
}

//Takes data as an argument and add it to the localstorage
function addNewNote(new_note_text) {
    var notes = getAllNotes();
    var new_note = {id:uniqueId(),timeStamp:'',text:new_note_text}
    console.log("Before:    ", notes.data_cn);
    window.localStorage.setItem('note', JSON.stringify({ "data_cn": [new_note, ...notes.data_cn] }))
    updateUi(true);
}

function deleteNote() {

}

//gets input value on button click
function getNewNoteData() {

    var new_note_text = document.getElementById("note_text").value;
    console.log("Clicked ", new_note_text);
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

main()