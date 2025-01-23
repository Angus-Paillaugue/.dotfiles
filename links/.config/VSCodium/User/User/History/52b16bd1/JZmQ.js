export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      const imageZoom = document.createElement('div');
      imageZoom.classList.add('image-zoom');
      imageZoom.style.backgroundImage = `url(${image.src})`;
      document.body.appendChild(imageZoom);

      imageZoom.addEventListener('click', () => {
        document.body.removeChild(imageZoom);
      });
    });
  })
}
