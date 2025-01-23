import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';
import highlighter from './src/lib/codeHighlighter.js';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkAttr from 'remark-attr';
import imageTransformer from './src/lib/imageTransformer.js';

/**
 * Replaces the anchor tags in the provided HTML string with anchor tags having a custom class.
 *
 * @param {string} html - The HTML string to modify.
 * @returns {string} The modified HTML string with custom class anchor tags.
 */
function customLinks(html) {
  return html.replace(/<a\b([^>]*)>/g, '<a $1 class="link">');
}

// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks
const config = {
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [
    remarkMath,
    remarkAttr,
    remarkUnwrapImages,
    imageTransformer,
    remarkCodeTitles,
    customLinks
  ],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug],
  highlight: {
    highlighter
  }
};

export default config;
