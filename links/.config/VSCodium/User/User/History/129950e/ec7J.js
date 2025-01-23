import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';

const username = process.argv.slice(2).filter(arg => arg.includes("username"))[0].split("=").at(-1);

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
  const files = JSON.parse(fs.readFileSync(resolve(__dirname,`./download/${username}/${type == "video" ? "videos" : "images"}.json`)));
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

(async() => {
  console.log("\n\n\nDownloading videos\n\n\n");
  await downloadType("video");
  console.log("\n\n\nDownloading images\n\n\n");
  await downloadType("image");
})();
