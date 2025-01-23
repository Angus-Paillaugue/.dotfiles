import { createHighlighter } from 'shiki';
import { parse } from 'node-html-parser';
// If you want to add other transformers for code blocks visit https://shiki.style/packages/transformers
import {
	transformerNotationDiff,
	transformerMetaHighlight,
	transformerNotationHighlight
} from '@shikijs/transformers';
import { codeBlockTheme } from '../../user-config.js';

const transformers = [
	transformerNotationDiff(),
	transformerMetaHighlight(),
	transformerNotationHighlight()
];

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {Promise<string>} - highlighted html
 */
async function highlighter(code, lang, meta) {
	const highlighter = await createHighlighter({
		langs: [lang],
		themes: [codeBlockTheme]
	});

	let html;
	if (!meta) {
		html = highlighter.codeToHtml(code, {
			lang,
			theme: codeBlockTheme,
			transformers
		});
	} else {
		html = highlighter.codeToHtml(code, {
			lang,
			theme: codeBlockTheme,
			transformers,
			meta: { __raw: meta }
		});
	}

	highlighter.dispose();

	html = makeFocusable(html);
	html = customCodeBlocks(html);
	html = customLinks(html);
	return escapeHtml(html);
}

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} html - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
	);
}

/**
 * Replaces the <pre> tags in the provided HTML string with a modified version that includes a copy code button.
 *
 * @param {string} html - The HTML string to modify.
 */
function customCodeBlocks(html) {
	return html.replace(
		/<pre\b([^>]*)>/g,
		'<pre$1><button tabindex="0" class="copy-code-button" name="copy-code"><Icon icon="ri:clipboard-line" class="w-6 h-6 copy" /><Icon icon="ri:check-line" class="w-6 h-6 copied hidden" /></button>'
	);
}

/**
 * Replaces the anchor tags in the provided HTML string with anchor tags having a custom class.
 *
 * @param {string} html - The HTML string to modify.
 * @returns {string} The modified HTML string with custom class anchor tags.
 */
function customLinks(html) {
	return html.replace(/<a\b([^>]*)>/g, '<a $1 class="link">');
}

/**
 * @param html {string} - code to highlight
 * @returns {string} - highlighted html
 */
function makeFocusable(html) {
	const root = parse(html);
	root.querySelector('pre').setAttribute('tabIndex', '0');
	return root.toString();
}

export default highlighter;
