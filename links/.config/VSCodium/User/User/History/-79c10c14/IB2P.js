import './style.css';

// Main function
(() => {
  const bookmarksContainer = document.getElementById('bookmarks');

  chrome.runtime.sendMessage({ message:'setBookmarks', data:[ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox", icon:'gmail' } ] } );

  chrome.runtime.sendMessage({ message:'getBookmarks' }, (res) => {
    console.log(res);
    res = [ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox", icon:'gmail' } ]
    const bookmarkElements = res.map((bookmark) => {
      const bookmarkElement = document.createElement('a');
      bookmarkElement.setAttribute('href', bookmark.url);
      bookmarkElement.classList.add(...'rounded-lg bg-gruvboxDark-bg1 text-gruvboxLight-100 p-2 text-4xl text-center flex flex-col items-center justify-center aspect-square'.split(' '));
      bookmarkElement.textContent = bookmark.title;
      bookmarkElement.innerHTML += `<i class="ri-${bookmark.icon}-line text-6xl"></i>`;
      return bookmarkElement;
    });

    bookmarksContainer.append(...bookmarkElements);
  });


})();
