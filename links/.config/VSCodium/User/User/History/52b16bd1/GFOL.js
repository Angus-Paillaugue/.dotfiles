export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      const imageZoom = document.createElement('div');
      imageZoom.classList.add(...'inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 bg-center bg-no-repeat bg-contain transition-all scale-0 duration-300 hidden'.split(" "));
      imageZoom.style.backgroundImage = `url(${image.src})`;
      document.body.appendChild(imageZoom);

      setTimeout(() => {
        imageZoom.classList.remove(...'scale-0 hidden'.split(" "));
        imageZoom.classList.add(...'scale-100 block'.split(' '));
      }, 0);

      imageZoom.addEventListener('click', () => {
        imageZoom.classList.remove(...'scale-100 block'.split(' '));
        setTimeout(() => {
          imageZoom.classList.add(...'scale-0 hidden'.split(' '));
        }, 300);
      });
    });
  })
}
