const { removeBackground } = require('@imgly/background-removal-node');

const source = "../input/IMG_20240701_123849077.jpg"
removeBackground(imgSource).then(blob => {
  new File([myBlob], "name.png");
})
