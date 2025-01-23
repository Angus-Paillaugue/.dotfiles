import fs from 'fs';
import { codeBlockTheme } from './user-config';


const themeJSON = fs.readFileSync(`./node_modules/shiki/themes/${codeBlockTheme}.json`, 'utf-8');
console.log(themeJSON);
