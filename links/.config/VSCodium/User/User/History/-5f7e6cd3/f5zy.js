import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { colors } from './project.config.js';
import {
  linkTransformer,
  headingTransformer,
  tableTransformer
} from './src/lib/transformer.js';
import { defineConfig } from 'mdsx';
import { createHighlighter } from 'shiki';
import { rehypeCustomHighlight } from '@mdsx/rehype-custom-highlighter';
import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerNotationHighlight
} from '@shikijs/transformers'; /** @see https://shiki.style/packages/transformers  */


const transformers = [
  transformerNotationDiff(),
  transformerMetaHighlight(),
  transformerNotationHighlight(),
  {
    name: 'line-numbers',
    postprocess(code) {
      return code.replace(/<pre class="\b([^>]*)>/g, '<pre class="line-numbers $1>');
    }
  }
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { codeBlockTheme } = colors;
const customHighlightOptions = {
  highlight: async ({ value, lang, meta }) => {
    const highlighter = await createHighlighter({
      langs: [lang],
      themes: [codeBlockTheme]
    });
    let html;
    if (!meta) {
      html = highlighter.codeToHtml(value, {
        lang,
        theme: codeBlockTheme,
        transformers: transformers.slice(0, -1)
      });
    } else {
      html = highlighter.codeToHtml(value, {
        lang,
        theme: codeBlockTheme,
        transformers: meta.includes('line-numbers') ? transformers : transformers.slice(0, -1),
        meta: { __raw: meta }
      });
    }

    highlighter.dispose();
    return escapeHtml(html);
  }
};


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

// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks
export const mdsxConfig = defineConfig({
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [
    remarkMath,
    tableTransformer,
    linkTransformer,
    headingTransformer,
    remarkCodeTitles,
  ],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug, [rehypeCustomHighlight, customHighlightOptions]],
  blueprints: {
    default: {
      path: resolve(__dirname, './src/lib/components/markdown/blueprint.svelte')
    }
  }
});
