import './style.css';


// Main function
(() => {
  const bookmarksContainer = document.getElementById('bookmarks');

  chrome.runtime.sendMessage({ message:'setBookmarks', data:[ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox" } ] } );

  chrome.runtime.sendMessage({ message:'getBookmarks' }, (res) => {
    console.log(res);
    res = [ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox" } ]
    const bookmarkElements = res.map((bookmark) => {
      const bookmarkElement = document.createElement('a');
      bookmarkElement.setAttribute('href', bookmark.url);
      bookmarkElement.classList.add(...'rounded-lg bg-gruvboxDark-300 text-gruvboxLight-100 px-2 py-1 m-1'.split(' '));
      bookmarkElement.textContent = bookmark.title;
      return bookmarkElement;
    });

    bookmarksContainer.append(...bookmarkElements);
  });


})();
