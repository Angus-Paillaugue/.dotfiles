import './style.css';


// Main function
(() => {


  chrome.runtime.sendMessage('getBookmarks',
    response => {
      console.log(response);
    }
  );

})();
