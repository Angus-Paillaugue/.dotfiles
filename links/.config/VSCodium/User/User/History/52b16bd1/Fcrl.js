export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {

    image.addEventListener('click', (e) => {
      // Image container
      const imageZoomContainer = document.createElement('div');
      imageZoomContainer.classList.add(
        ...'inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 opacity-0 flex-col items-center justify-center'.split(
          ' '
        )
      );
      // Image
      const imageZoomImage = document.createElement('img');
      imageZoomImage.src = e.target.src;
      imageZoomImage.classList = 'w-full h-full object-contain scale-0';

      imageZoomContainer.appendChild(imageZoomImage);

      // For animation to work, we need to wait for the next frame
      setTimeout(() => {
        imageZoomContainer.classList.remove('opacity-0');
        imageZoomImage.classList.remove('scale-0');
        imageZoomContainer.classList.add(...'opacity-100 flex'.split(' '));
        imageZoomImage.classList.add('scale-100');
      }, 0)

      imageZoomContainer.addEventListener('click', () => {
        imageZoomContainer.classList.remove(...'opacity-100 flex'.split(' '));
        imageZoomImage.classList.remove('scale-100');
        imageZoomContainer.classList.add('opacity-0');
        imageZoomImage.classList.add('scale-0');
        setTimeout(() => {
          imageZoomContainer.remove();
        }, 300);
      });

      document.body.appendChild(imageZoomContainer);
    });
  })
}
