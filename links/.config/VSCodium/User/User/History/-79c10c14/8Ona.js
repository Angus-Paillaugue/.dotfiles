import './style.css';


// Main function
(() => {


  chrome.storage.local.get(["bookmarks"], ({ bookmarks = [] }) => {
    console.log(bookmarks);
  });

  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Ove. I am from Override app.',
      },
    },
    response => {
      console.log(response.message);
    }
  );

})();
