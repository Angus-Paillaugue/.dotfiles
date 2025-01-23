import { codeBlockTheme } from './user-config.js';


(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  const inlineCodeBg = theme.default.colors['editor.background'];
  console.log(inlineCodeBg);
})()
