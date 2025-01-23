import fs from 'fs';

const file = fs.readFileSync('onlyfans.com.har', 'utf8');

const har = JSON.parse(file);
const entries = har.log.entries;

const cleanRequests = []


for (const entry of entries) {
  const request = entry.request;
  const response = entry.response;

  if(request.url.includes("photos?limit=")) {
    console.log(response.content.text);
    cleanRequests.push({
      url: request.url
    });
  }
}
