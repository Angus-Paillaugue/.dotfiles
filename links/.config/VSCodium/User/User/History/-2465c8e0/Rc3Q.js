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
  transformerNotationHighlight(),
  {
    name: '@shikijs/transformers:line-numbers',
    postprocess(code) {
      return code.replace(/<pre class="\b([^>]*)>/g, '<pre class="line-numbers $1>');
    }
  }
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
      transformers: meta.includes('no-lines-numbers') ? transformers.slice(0, -1) : transformers,
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
    '<pre$1><button tabindex="0" class="copy-code-button" name="copy-code"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copy" viewBox="0 0 24 24"><path fill="currentColor" dd="M9.116 17q-.691 0-1.153-.462T7.5 15.385V4.615q0-.69.463-1.153T9.116 3h7.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T16.884 17zm0-1h7.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T16.884 4H9.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T4.5 18.385V7.115q0-.213.143-.356T5 6.616t.357.143t.143.357v11.269q0 .23.192.423t.423.192h8.27q.213 0 .356.143t.143.357t-.143.357t-.357.143zM8.5 16V4z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copied hidden" viewBox="0 0 24 24"><path fill="currentColor"  d="m9.55 15.88l8.802-8.801q.146-.146.344-.156t.363.156t.166.357t-.165.356l-8.944 8.95q-.243.243-.566.243t-.566-.243l-4.05-4.05q-.146-.146-.152-.347t.158-.366t.357-.165t.357.165z"></path></svg></button>'
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
