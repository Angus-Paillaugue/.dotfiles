import fs from 'fs';
import { codeBlockTheme } from './user-config.js';


const themeJSON = fs.readFileSync(`./node_modules/shiki/dist/themes/${codeBlockTheme}.json`, 'utf-8');
console.log(themeJSON);
