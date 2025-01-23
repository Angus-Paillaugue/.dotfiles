import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';
const __dirname = import.meta.dirname;

let username = ""
let downloadImages = false;
let downloadVideos = false;
for (let i = 1; i < process.argv.length; i++ ) {
  const arg = process.argv[i];
  if(arg.startsWith('--username')) {
    i ++;
    username = process.argv[i];
    continue;
  }else if(arg.startsWith('--videos')) {
    downloadVideos = true;
    continue;
  }else if (arg.startsWith('--images')) {
    downloadImages = true;
    continue;
  }else {
    console.error(`Error : unknown argument ${}`)
  }
}
console.log({username, downloadImages, downloadVideos});

async function download(file, type) {
  try {
    const response = await axios.get(file.url, { responseType: 'stream' });
    const outputFilePath = resolve(__dirname,`./download/${username}/${type == "video" ? "videos" : "images"}/${file.title}.${type == "video" ? "mp4" : "jpg"}`);
    const writer = fs.createWriteStream(outputFilePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', (error) => {
        fs.appendFileSync(resolve(__dirname, './log.txt'), `${file.title}: ${error}\n`);
        reject(error);
      });
    });
  } catch (error) {
    fs.appendFileSync(resolve(__dirname,'./log.txt'), `${file.title}: ${error}\n`);
    throw error;
  }
}

async function downloadType(type) {
  fs.mkdirSync(resolve(__dirname,`./download/${username}/videos/`), { recursive: true });
  fs.mkdirSync(resolve(__dirname,`./download/${username}/images/`), { recursive: true });
  const files = JSON.parse(fs.readFileSync(resolve(__dirname,`./download/${username}/${type == "video" ? "videos" : "photos"}.json`)));
  for (let i in files) {
    const file = files[i];
    try {
      console.log(`\n(${files.length - i - 1} remaining) - Downloading ${file.title}...`);
      await download(file, type);
    } catch (error) {
      console.error(`Error downloading ${file.title}: ${error.message}`);
    }
  }
}

// (async() => {
//   if(downloadVideos) {
//     console.log("\n\n\nDownloading videos\n\n\n");
//     await downloadType("video");
//   }
//   if(downloadImages) {
//     console.log("\n\n\nDownloading images\n\n\n");
//     await downloadType("image");
//   }
// })();
