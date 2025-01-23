import { codeBlockTheme } from './user-config.js';
import fs from 'fs';

(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  const inlineCodeBg = theme.default.colors['editor.background'];
  const lineRemovedBg = theme.default.tokenColors.find(
		(color) => color.scope === 'markup.deleted.diff'
	).settings.background;
  console.log(inlineCodeBg);
})()
