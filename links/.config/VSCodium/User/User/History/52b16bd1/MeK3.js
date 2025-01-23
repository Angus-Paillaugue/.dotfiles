export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      const imageZoom = document.createElement('div');
      imageZoom.classList.add(...'inset-0 fixed z-50 bg-body-dark/50 dark:bg-body/50 bg-center bg-no-repeat bg-contain'.split(" "));
      imageZoom.style.backgroundImage = `url(${image.src})`;
      document.body.appendChild(imageZoom);

      imageZoom.addEventListener('click', () => {
        document.body.removeChild(imageZoom);
      });
    });
  })
}
