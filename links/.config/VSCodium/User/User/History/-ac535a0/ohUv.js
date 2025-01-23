import { codeBlockTheme } from './user-config.js';
import fs from 'fs';

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!result)
    return null;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function applyChange(theme, key, cssVar) {
  try {
		const inlineCodeBg = theme.default.colors['editor.background'];
    let codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
		codeCSSFile = codeCSSFile.replace(`${cssVar}: .+;`, `${cssVar}: ${inlineCodeBg};`);

		fs.writeFileSync(`./src/code.css`, codeCSSFile);
	} catch (_) {
		console.error(
			'Error in updating inline code background color.\n You will need to manually update the inline code background color in the src/code.css file.'
		);
	}
}
function throwError() {
  console.error(`Error in updating ${}.\n You will need to manually update the inline code background color in the src/code.css file.`);
}

(async () => {
  const theme = await import(`./node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);
  applyChange(theme, 'inline-code-bg', '--inline-code-bg');

  try {
    const inlineCodeBg = theme.default.colors['editor.background'];
    let newCSS = codeCSSFile;
    newCSS = newCSS.replace(/--inline-code-bg: .+;/, `--inline-code-bg: ${inlineCodeBg};`);

    fs.writeFileSync(`./src/code.css`, newCSS);
  } catch (error) {
    console.error('Error in updating inline code background color.\n You will need to manually update the inline code background color in the src/code.css file.');
  }
  const lineRemovedBg = hexToRgb(
		theme.default.tokenColors.find((color) => color.scope === 'markup.inserted.diff').settings
			.foreground
	);
  const lineAddedBg = hexToRgb(
		theme.default.tokenColors.find((color) => color.scope === 'markup.deleted.diff').settings
			.foreground
	);

  newCSS = newCSS.replace(/--line-removed-bg: .+;/, `--line-removed-bg: ${lineRemovedBg};`);
  newCSS = newCSS.replace(/--line-added-bg: .+;/, `--line-added-bg: ${lineAddedBg};`);

  console.log(inlineCodeBg, lineRemovedBg, lineAddedBg);
})()
