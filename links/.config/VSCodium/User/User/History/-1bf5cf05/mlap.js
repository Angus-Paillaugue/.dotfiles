import { writeFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registryFilePath = path.resolve(__dirname, '../src/lib/Demos/index.js');

const allDemos = readdirSync(path.resolve(__dirname, '../src/routes/demos/'))
console.log(allDemos);
