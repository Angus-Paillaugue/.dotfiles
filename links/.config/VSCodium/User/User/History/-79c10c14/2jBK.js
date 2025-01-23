import './style.css';


// Main function
(() => {


  chrome.storage.local.get(["bookmarks"]).then(({ bookmarks = [] }) => {
    console.log(bookmarks);
  });

})();
