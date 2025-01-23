import fs from 'fs';

const file = fs.readFileSync('onlyfans.com.har', 'utf8');

const har = JSON.parse(file);
const entries = har.log.entries;

const rawEntries = []


for (const entry of entries) {
  const request = entry.request;
  const response = entry.response;

  // The request is a photo request
  if(request.url.includes("photos?limit=")) {
    console.log(response.content.text);
    const photo = JSON.parse(response.content.text);
    rawEntries.push(photo);
  }
}

fs.writeFileSync('photos.json', JSON.stringify(rawEntries, null, 2));
