import { codeBlockTheme } from './user-config.js';
import fs from 'fs';

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!result)
    return null;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}


(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  const inlineCodeBg = theme.default.colors['editor.background'];
  const lineRemovedBg = hexToRgb(theme.default.tokenColors.find(
		(color) => color.scope === 'markup.inserted.diff'
	).settings.foreground);
  const lineAddedBg = hexToRgb(theme.default.tokenColors.find(
		(color) => color.scope === 'markup.added.diff'
	).settings.foreground);
  console.log(inlineCodeBg, lineRemovedBg, lineAddedBg);
})()
