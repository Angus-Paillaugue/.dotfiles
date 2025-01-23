import './style.css';


// Main function
(() => {

  chrome.runtime.sendMessage({ message:'setBookmarks', data:[ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox" } ] } );

  const bookmarksContainer = document.getElementById('bookmarks');
  chrome.runtime.sendMessage({ message:'getBookmarks' }, (res) => {
    console.log(res);
    const bookmarkElements = res.map((bookmark) => {
      const bookmarkElement = document.createElement('div');
      bookmarkElement.classList.add('bookmark');
      bookmarkElement.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
      `;
      return bookmarkElement;
    });

    bookmarksContainer.append(...bookmarkElements);
  });


})();
