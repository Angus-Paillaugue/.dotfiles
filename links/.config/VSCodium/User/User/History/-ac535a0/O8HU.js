import fs from 'fs';
import { codeBlockTheme } from './user-config.js';


const theme = fs.readFileSync(`./node_modules/shiki/dist/themes/${codeBlockTheme}.js`, 'utf-8');
console.log(theme);
