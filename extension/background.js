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
      // Send the selected text to the popup
      chrome.storage.local.set({selectedText: info.selectionText}, function() {
          console.log("Selected text saved:", info.selectionText);
      });
  }
});
