import { codeBlockTheme } from './user-config.js';


(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  const 
  console.log(theme);
})()
