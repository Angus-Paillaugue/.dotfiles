'use strict';

import './style.css';


// Main function
(async() => {


  const bookmarks = await chrome.storage.local.get(["bookmarks"])
  console.log(bookmarks);
})();
