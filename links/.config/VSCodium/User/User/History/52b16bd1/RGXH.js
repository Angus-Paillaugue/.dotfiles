export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      const imageZoomContainer = document.createElement('div');
      imageZoomContainer.classList.add(...'inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 bg-center bg-no-repeat bg-contain transition-all scale-0 duration-300 hidden'.split(" "));
      imageZoomContainer.style.backgroundImage = `url(${image.src})`;
      document.body.appendChild(imageZoomContainer);

      setTimeout(() => {
        imageZoomContainer.classList.remove(...'scale-0 hidden'.split(" "));
        imageZoomContainer.classList.add(...'scale-100 block'.split(' '));
      }, 0);

      imageZoomContainer.addEventListener('click', () => {
        imageZoomContainer.classList.remove(...'scale-100 block'.split(' '));
        setTimeout(() => {
          imageZoomContainer.classList.add(...'scale-0 hidden'.split(' '));
        }, 300);
      });
    });
  })
}
