'use strict';

// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getBookmarks') {
    chrome.bookmarks.getTree(bookmarks => {
      sendResponse(bookmarks);
    });
  }
});
