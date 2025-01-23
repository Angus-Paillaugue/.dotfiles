import fs from 'fs';


// First path: onlyfans.com.har -> photos.json
const file = fs.readFileSync('onlyfans.com.har', 'utf8');
const har = JSON.parse(file);
const rawEntries = []
for (const entry of har.log.entries) {
  const request = entry.request;
  const response = entry.response;

  // The request is a photo request
  if(request.url.includes("photos?limit=")) {
    const photo = JSON.parse(response.content.text);
    rawEntries.push(photo);
  }
}
fs.writeFileSync('photos.json', JSON.stringify(rawEntries, null, 2));


// Second path: cleanup
