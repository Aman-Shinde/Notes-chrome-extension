console.log("I am at foreground",window.location.href);
chrome.runtime.sendMessage({message: "I am at foreground"});