
// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getBookmarks') {
    chrome.storage.local.get('bookmarks', ({ bookmarks = [] }) => {
      sendResponse(bookmarks);
    });
  }else if (request.message === 'setBookmarks') {
    chrome.storage.local.set({bookmarks: request.data}, () => {
      sendResponse('Bookmark set');
    });
  }
});
