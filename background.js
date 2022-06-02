console.log("Hi form background page");


// chrome.tabs.onActivated.addListener( tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info =>{
//         //console.log(current_tab_info); // gives the information of current tab url;

//         // if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
//         //     active_tab_id = tab.tabId;
//         //     chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('i injected'));
//         // }
//     })
// });


chrome.tabs.onActivated.addListener( tab =>     //Added a eventlistner to listen for each and every tab
    {
        chrome.tabs.executeScript(null, {file: './foreground.js'}, () => 
            {
                     console.log('i injected')
            });
        chrome.tabs.get(tab.tabId, current_tab_info =>
        {  
            
            console.log(current_tab_info);
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.message === 'I am at foreground') {
                    console.log(request.message)
                    console.log(current_tab_info);
            }
});
            
            // get the tabId for current active tab and callback function 
            // if (/^https:\/\/www\.google/.test(current_tab_info.url)) 
            // {   
            //     console.log(current_tab_info);
            //     active_tab_id = tab.tabId;
            //     chrome.tabs.executeScript(null, {file: './foreground.js'}, () => 
            //     {
            //         console.log('i injected')
            //     });
            // }
        });
    }
);


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'hi i am from foreground') {
//         console.log(request.message)
//         console.log("nice")
//     }
// });



//null = Each active tab
//2nd parameter: file path, we r gg to inject codes into 
//3rd para, call back function. 




/* 

######## CURRENT_TAB_INFO OBJECT  $$$$$$$

active: true
audible: false
autoDiscardable: true
discarded: false
favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
groupId: -1
height: 649
highlighted: true
id: 128
incognito: false
index: 7
mutedInfo: {muted: false}
pinned: false
selected: true
status: "complete"
title: "Debugging Content Scripts for Chrome Extension - Stack Overflow"
url: "https://stackoverflow.com/questions/17119385/debugging-content-scripts-for-chrome-extension"
width: 451
windowId: 1

*/

