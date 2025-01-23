import fs from 'fs';
// fs.writeFileSync('photos.json', JSON.stringify(rawEntries, null, 2));


// Second path: cleanup
const slugify = (value) => {
  // Normalize the value
  value = value.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');

  // Replace non-alphanumeric characters with spaces
  value = value.replace(/[^\w\s-]/g, '').toLowerCase();

  // Replace whitespace and hyphens with a single hyphen
  value = value.replace(/[-\s]+/g, '-');

  // Trim leading and trailing hyphens and underscores
  return value.replace(/^[-_]+|[-_]+$/g, '');
};


function cleanUpImages(filename) {
  const har = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const rawEntries = []
  for (const entry of har.log.entries) {
    const request = entry.request;
    const response = entry.response;

    // The request is a photo request
    if(request.url.includes("photos?limit=")) {
      const photo = JSON.parse(response.content.text);
      for (const images of photo.list) {
        const text = slugify(images.rawText.slice(0, 50)) || uuid.v4();
        for (const [i, image] of images.media.entries()) {
          if (image.source.source || image.type === "image") {
            properImageFile.push({ url: image.source.source, title: `${text}(${i})`, postedAt: image.createdAt });
          }
        }
      }
    }
  }
  fs.writeFileSync('photos.json', JSON.stringify(rawEntries, null, 2));
}


cleanUpImages('onlyfans.com.har')
