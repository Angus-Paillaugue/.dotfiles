import './style.css';


// Main function
(() => {


  chrome.storage.local.get(["bookmarks"], ({ bookmarks = [] }) => {
    console.log(bookmarks);
  });

  chrome.runtime.sendMessage('getBookmarks',
    response => {
      console.log(response);
    }
  );

})();
