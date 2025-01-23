import './style.css';

// Main function
(() => {
  const bookmarksContainer = document.getElementById('bookmarks');
  const welcomeMessage = document.getElementById('welcome');

  chrome.runtime.sendMessage({ message:'getUsername' }, (res) => {
  welcomeMessage.innerHTML = 'Good';
  });


  chrome.runtime.sendMessage({ message:'setBookmarks', data:[ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox", icon:'mail' } ] } );

  chrome.runtime.sendMessage({ message:'getBookmarks' }, (res) => {
    console.log(res);
    res = [ { title:"Gmail", url:"https://mail.google.com/mail/u/0/?pli=1#inbox", icon:'mail' } ]
    const bookmarkElements = res.map((bookmark) => {
      const bookmarkElement = document.createElement('a');
      bookmarkElement.setAttribute('href', bookmark.url);
      bookmarkElement.classList.add(...'rounded-lg bg-gruvboxDark-bg1 text-gruvboxDark-100 p-2 text-4xl text-center flex flex-col items-center justify-center gap-6 aspect-square relative group overflow-hidden'.split(' '));
      bookmarkElement.innerHTML = `<i class="ri-${bookmark.icon}-line text-6xl"></i> <span class="absolute -bottom-14 h-14 left-0 right-0 text-center transition-all group-hover:bottom-0 pb-2">${bookmark.title}</span>`;
      return bookmarkElement;
    });

    bookmarksContainer.append(...bookmarkElements);
  });




})();
