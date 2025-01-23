import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { randomUUID } from 'crypto';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


const rl = readline.createInterface({ input, output });



/**
 * Converts a string to a slug by removing non-alphanumeric characters,
 * normalizing diacritics, and replacing spaces with hyphens.
 *
 * @param {string} value - The string to be converted to a slug.
 * @returns {string} The slugified string.
 */
const slugify = (value) => {
  if (!value) {
    return randomUUID();
  }
  // Normalize the value
  value = value.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');

  // Replace non-alphanumeric characters with spaces
  value = value.replace(/[^\w\s-]/g, '').toLowerCase();

  // Replace whitespace and hyphens with a single hyphen
  value = value.replace(/[-\s]+/g, '-');

  // Trim leading and trailing hyphens and underscores
  return value.replace(/^[-_]+|[-_]+$/g, '');
};


/**
 * Cleans up the given har file and extracts the images and videos information.
 * @param {string} filename - The path to the har file.
 * @param {string} username - The username associated with the downloaded media.
 */
function cleanup(filename, username) {
  // Read the har file
  const har = JSON.parse(readFileSync(filename, 'utf8'));
  const images = [];
  const videos = [];
  // Loop through the entries
  for (const entry of har.log.entries) {
    const request = entry.request;
    const response = entry.response;

    // The request is a photo request
    if(request.url.includes("medias?limit=")) {
      const content = JSON.parse(response.content.text);

      // Loop through the media
      for (const media of content.list) {
        // Get the text
        const text = slugify(media?.text?.slice(0, 50));
        for (const [i, content] of media.media.entries()) {
          const url = content?.files?.full?.url;
          if(!url) continue;
          const title = i > 0 ? `${text}(${i})` : text;
          const postedAt = media.postedAt;
          if(content.type === "photo") {
            images.push({ url, title, postedAt });
          }else {
            videos.push({ url, title, postedAt });
          }
        }
      }
    }
  }
  // Write the output to the images.json file
  writeFileSync(`download/${username}/images.json`, JSON.stringify(images, null, 2));
  // Write the output to the videos.json file
  writeFileSync(`download/${username}/videos.json`, JSON.stringify(videos, null, 2));
}


// Main function
(async() => {
  const username = 'hazel_hoffman';
  // const username = await rl.question('What is the username of the onlyfans? ');
  const filename = "download/"+username+"/"+readdirSync("download/"+username).filter(fn => fn.endsWith('.har'))[0];

  // const cleanupAnswer = await rl.question('Do you want to cleanup? (y/n) ');
  // if(cleanupAnswer === 'y') {
    cleanup(filename, username);
  // }
  rl.close();
})();
