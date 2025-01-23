import './style.css';


// Main function
(() => {

  const bookmarksContainer = document.getElementById('bookmarks');
  chrome.runtime.sendMessage('getBookmarks', (res = []) => {
    console.log(res);
  });


})();
