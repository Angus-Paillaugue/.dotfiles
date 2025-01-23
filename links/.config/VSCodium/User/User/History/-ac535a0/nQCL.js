import fs from 'fs';
import { codeBlockTheme } from './user-config.js';


(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  console.log(theme);
})()
