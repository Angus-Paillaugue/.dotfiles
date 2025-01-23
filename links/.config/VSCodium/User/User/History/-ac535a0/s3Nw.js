import { codeBlockTheme } from './user-config.js';
import fs from 'fs';

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!result)
    return null;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}


(async () => {
  const codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  const inlineCodeBg = theme.default.colors['editor.background'];
  const lineRemovedBg = hexToRgb(
		theme.default.tokenColors.find((color) => color.scope === 'markup.inserted.diff').settings
			.foreground
	);
  const lineAddedBg = hexToRgb(
		theme.default.tokenColors.find((color) => color.scope === 'markup.inserted.diff').settings
			.foreground
	);

  let newCSS = codeCSSFile;
  newCSS = newCSS.replace(/--inline-code-bg: .+;/, `--inline-code-bg: ${inlineCodeBg};`);
  newCSS = newCSS.replace(/--line-removed-bg: .+;/, `--line-removed-bg: ${lineRemovedBg};`);
  newCSS = newCSS.replace(/--line-added-bg: .+;/, `--line-added-bg: ${lineAddedBg};`);

  fs.writeFileSync(`./src/code.css`, newCSS);
  console.log(inlineCodeBg, lineRemovedBg, lineAddedBg);
})()
