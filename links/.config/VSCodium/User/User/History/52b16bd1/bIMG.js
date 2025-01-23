export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    image.addEventListener('click', (e) => {
      console.log(e.target);

      const imageZoomContainer = document.createElement('div');
      const imageZoomImage = document.createElement('img');
      imageZoomImage.src = e.target.src;
      imageZoomImage.classList = 'w-full h-full object-contain';
      imageZoomContainer.classList.add(
        ...'inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 scale-0 flex-col items-center justify-center'.split(
          ' '
        )
      );
      imageZoomContainer.appendChild(imageZoomImage);

      // For animation to work, we need to wait for the next frame
      setTimeout(() => {
        imageZoomContainer.classList.remove(...'scale-0'.split(" "));
        imageZoomContainer.classList.add(...'scale-100 flex'.split(' '));
      }, 0)

      imageZoomContainer.addEventListener('click', () => {
        imageZoomContainer.classList.remove(...'scale-100 flex'.split(' '));
        imageZoomContainer.classList.add(...'scale-0'.split(' '));
        setTimeout(() => {
          imageZoomContainer.remove();
        }, 300);
      });

      document.body.appendChild(imageZoomContainer);
    });
  })
}
