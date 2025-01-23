'use strict';

// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'getBookmarks') {
    chrome.bookmarks.getTree((bookmarks) => {
      chrome.storage.local.set({ bookmarks });
      sendResponse(bookmarks);
    });
    chrome.storage.local.get('bookmarks', (res=[]) => {
      console.log(res);
      sendResponse(res);
    });
  }
});
