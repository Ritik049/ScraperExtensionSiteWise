// background.js

// Create a context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "searchProduct",
        title: "Search Product",
        contexts: ["selection"]
    });
});

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "searchProduct") {
        // Store the selected text
        chrome.storage.local.set({ selectedText: info.selectionText }, function() {
            console.log("Selected text saved:", info.selectionText);
            // Optionally open the popup or perform other actions
            chrome.action.openPopup(); // Use chrome.action instead of chrome.browserAction
        });
    }
});

// Function to handle the selected text
function handleSelection(selectedText) {
    // Do something with the selected text (e.g., open popup or fetch data)
    chrome.storage.local.set({selectedText: selectedText}, function() {
        console.log("Selected text saved:", selectedText);
        // Open the popup if needed or handle text in another way
    });
}
