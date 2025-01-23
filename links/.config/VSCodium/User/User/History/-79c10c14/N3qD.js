'use strict';

import './style.css';


// Main function
(() => {


  const bookmarks = await fetch('https://api.sampleapis.com/bookmarks/').then(response => response.json());

})();
