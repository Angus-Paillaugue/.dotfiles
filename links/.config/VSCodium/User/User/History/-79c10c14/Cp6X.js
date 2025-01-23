import './style.css';


// Main function
(() => {

  // chrome.runtime.sendMessage({ message:'setBookmarks', data:[ title:"Gmail" ] } );

  const bookmarksContainer = document.getElementById('bookmarks');
  chrome.runtime.sendMessage({ message:'getBookmarks' }, (res = []) => {
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
