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
// fs.writeFileSync('photos.json', JSON.stringify(rawEntries, null, 2));


// Second path: cleanup
// def cleanUpImages(username):
//     try:
//         filePath = os.path.join(mainDir,f'download/{username}/images.json')
//         with open(filePath, "r") as imagesRequestsFile:
//             properImageFile = []
//             imagesRequests = json.load(imagesRequestsFile)
//             for request in imagesRequests:
//                 for images in request["list"]:
//                     text = slugify(images["rawText"][:50]) if images["rawText"] != None else str(uuid.uuid4())
//                     for i, image in enumerate(images["media"], start=1):
//                         if image["source"]["source"] != None or image["source"]["source"] != "null" or image["source"]["source"] != "undefined" or image["type"] == "image":
//                             properImageFile.append({ "url":image["source"]["source"], "title":f"{text}({i})", "postedAt":image["createdAt"] })

//         with open(filePath, "w") as outFile:
//             outFile.write(json.dumps(properImageFile, indent=4))
//     except Exception as e:
//         print(e)
//     print(f"The images are probably already cleaned !\n{len(properImageFile)} images left")
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
const properImageFile = []
for (const request of rawEntries) {
  for (const images of request.list) {
    const text = slugify(images.rawText.slice(0, 50)) || uuid.v4();
    for (const [i, image] of images.media.entries()) {
      if (image.source.source || image.type === "image") {
        properImageFile.push({ url: image.source.source, title: `${text}(${i})`, postedAt: image.createdAt });
      }
    }
  }
}
fs.writeFileSync('photos.json', JSON.stringify(properImageFile, null, 2));
