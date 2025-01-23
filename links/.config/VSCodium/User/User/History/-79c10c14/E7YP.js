'use strict';

import './style.css';


// Main function
(async() => {


  chrome.storage.local.get(["bookmarks"]).then(({ bookmarks = [] }) => {
    console.log(bookmarks);
  });
})();
