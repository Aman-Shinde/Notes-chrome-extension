// console.log("Hi from content.js");
// // console.log(window.location.href);
// const currentSiteUrl = window.location.href;
// const urlParams = currentSiteUrl.split("/");
// const urlTitle = urlParams[urlParams.length-1];
// // console.log(currentSiteUrl);
// // console.log(urlTitle);
// let Data = {
//     "Notes": [
//         {   
//             "Id": "",
//             "Title" : "",
//             "Category":"",
//             "Description": "",
//             "NextId": ""
//         }
//     ]
// };

// function createNote(urlTitle,category,currentSiteUrl)
// {
//     var uniqueId = 'unid' + (new Date()).getTime();
//     var noteTitle = urlTitle;
//     var noteCategory = category;
//     var noteDescription = currentSiteUrl;
//     var Note = {
//         "Id":uniqueId,
//         "Title": noteTitle,
//         "Category": noteCategory,
//         "Description": noteDescription,
//     }

//     Data.Notes.push(Note);
// }

// createNote(urlTitle,"URL",currentSiteUrl);
// console.log(Data);