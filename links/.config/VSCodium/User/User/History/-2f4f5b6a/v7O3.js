import { mkdirSync, readFileSync } from 'fs';
import { randomUUID } from 'crypto';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


const rl = readline.createInterface({ input, output });


// Normalize a string to a slug
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
  const output = []
  for (const entry of har.log.entries) {
    const request = entry.request;
    const response = entry.response;

    // The request is a photo request
    if(request.url.includes("photos?limit=")) {
      const photo = JSON.parse(response.content.text);
      // Loop through the photos
      for (const images of photo.list) {
        // Get the text
        const text = slugify(images.rawText.slice(0, 50)) || randomUUID();
        // Loop through the images
        for (const [i, image] of images.media.entries()) {
          if (image.source.source || image.type === "image") {
            output.push({ url: image.source.source, title: `${text}(${i})`, postedAt: image.createdAt });
          }
        }
      }
    }
  }
  fs.writeFileSync('photos.json', JSON.stringify(output, null, 2));
}

function cleanUpVideos(filename) {
  const har = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const output = []
  for (const entry of har.log.entries) {
    const request = entry.request;
    const response = entry.response;

    // The request is a video request
    if(request.url.includes("videos?limit=")) {
      const video = JSON.parse(response.content.text);
      // Loop through the photos
      for (const videos of video.list) {
        // Get the text
        const text = slugify(videos.rawText.slice(0, 50)) || randomUUID();
        // Loop through the videos
        for (const [i, video] of videos.media.entries()) {
          if (video.source.source || video.type === "video") {
            output.push({ url: video.source.source, title: `${text}(${i})`, postedAt: video.createdAt });
          }
        }
      }
    }
  }
  fs.writeFileSync('videos.json', JSON.stringify(output, null, 2));
}


// Main function
(async() => {
  const username = await rl.question('What is the username of the onlyfans? ');
  rl.close();
  const filename = await rl.question('What is the filename of the har file? ');
  rl.close();

  const cleanupImagesAnswer = await rl.question('Do you want to cleanup images? (y/n) ');
  rl.close();
  if(cleanupImagesAnswer === 'y') {
    cleanUpImages(filename);
  }

  const cleanupVideosAnswer = await rl.question('Do you want to cleanup videos? (y/n) ');
  rl.close();
  if(cleanupVideosAnswer === 'y') {
    cleanUpVideos(filename);
  }
})();
