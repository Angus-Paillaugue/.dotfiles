import './style.css';


// Main function
(() => {


  chrome.storage.local.get(["bookmarks"], ({ bookmarks = [] }) => {
    console.log(bookmarks);
  });

})();
