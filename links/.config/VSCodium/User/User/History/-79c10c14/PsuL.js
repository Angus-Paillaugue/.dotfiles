import './style.css';


// Main function
chrome.runtime.sendMessage('getBookmarks', (res) => {
  console.log("res");
});
(() => {




})();
