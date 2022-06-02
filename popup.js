
let data = {
    "notes": [
        {
            "Title": "Title1",
            "Description": "There is nothing either good or bad, but thinking makes it so.      - William Shakespeare",
            "Category": "Text"
        },
        {
            "Title": "Title2",
            "Description": "Description of the title given above",
            "Category": "Text"
        },
        {
            "Title": "Title3",
            "Description": "Description of the title given above",
            "Category": "Text"
        },
        {
            "Title": "Title4",
            "Description": "Description of the title given above",
            "Category": "Text"
        },
        {
            "Title": "Title5",
            "Description": "Description of the title given above",
            "Category": "Text"
        },
        {
            "Title": "Title6",
            "Description": "Description of the title given above",
            "Category": "Text"
        }
    ]
};


// const parentElement = document.querySelector('.notes-list');


// function fetchNotes(data) // Fetch all the notes available in data objects
// {
//     data.notes.forEach(note => {
//         displayNote(note);
//     });
// };

// function displayNote(note) // Takes Note as a input and render the same in frontend
// {   
//     let newNoteHTML = `
//         <div class="box">
//             <div>
//                 <h3>${note.Title}</h3>
//                 <p>${note.Description}</p>
//             </div>
//             <div class="span-buttons">
//                 <span><img class="btn" src="./Delete1.png"></img></span>
//                 <span><img class="btn" src="./Done1.png"></img></span>
//             </div>
//         </div>
//     `;
//     parentElement.innerHTML += newNoteHTML;
// };

// //fetchNotes(data);

// function searchNotes(searchedText)  // Gets the searched text as a input and search in all existing Notes and return the array
// {

// };

// function displayNotes(listOfNotes) // Takes listOf Notes as a input and render the same in frontend
// {

// };

// function getSearch()
// {   
//     console.log("Search button clicked");
//     var search_value = document.getElementById("search-box-value").value;
//     console.log("search_value",search_value);
//     document.getElementById("search-box-value").value = "";
// };

// function getNote()
// {
//     var title = document.getElementById("title").value;
//     var category = document.getElementById("category").value;
//     var description = document.getElementById("description").value;
//     document.getElementById("title").value = "";
//     document.getElementById("category").value = "Text";
//     document.getElementById("description").value = "";
//     var note = { "Title" : `${title}`, "Description" : `${description}`, "Category":`${category}`};
//     data.notes.push(note)
//     console.log("value of data ", data);
// };

// function addNote(Note) // Take Note as an object and push it to the local storage data variable
// {

// };

// function deleteNote(id) // Take Id as a parameter and delete the consequent note from the data object
// {

// };

// function fetchNotesfromLocalStorage()
// {
//     var items = localStorage.getItem(''); // have to pass the variable/object name 
//     var itemArray = JSON.parse(items);
// }

// function storeNoteInLocalStorage(note)
// {
//     var newNote = JSON.stringify(note);
//     localStorage.setItem('',newNote); // have to pass the variable/object name 
// }

// function changeClass() {

// // var button_class = document.getElementById('main').className;
// console.log("Classname:  ")

// }

document.getElementById("toggle").addEventListener("click", toggleMode);

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

function fetchNotes() // Fetch all the notes available in data objects
{
    data.notes.forEach(note => {
        displayNote(note);
    });
};

function displayNote(note) // Takes Note as a input and render the same in frontend
{
    let newNoteHTML = `            
    <div class='note'>
        <span> ${note.Description}</span>
        <div class="note-footer">
            <button class='button delete'>Delete</button>
        </div>
    </div>`;
    notesContainer.innerHTML += newNoteHTML;
};

function getDataFromLocalStorage() {
    var rawdata = chrome.storage.local.get(['data'], function (result) {
        console.log("data:  ",result.data);
        return result.data;
    });

    return rawdata;
}

function setDataInLocalStorage() {
    var data = getDataFromLocalStorage()
    if (!data) {
        chrome.storage.local.set({ data: [1, 2, 3, 4, 5] }, () => {
            console.log('Value is set ');
        });
    }
    else{
        console.log("data is already set")
    }
}

fetchNotes();

setDataInLocalStorage();

// setTimeout(() => {
//     getDataFromLocalStorage();
// }, 2000);


