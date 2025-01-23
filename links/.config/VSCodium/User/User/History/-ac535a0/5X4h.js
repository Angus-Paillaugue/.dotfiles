import fs from 'fs';
import { codeBlockTheme } from './user-config.js';


const getTheme = async() => await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.js`);
console.log(await getTheme());
