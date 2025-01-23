import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkAttr from 'remark-attr';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { colors } from './project.config.js';

const { codeBlockTheme } = colors;
import {
  imageTransformer,
  linkTransformer,
  headingTransformer,
  tableTransformer
} from './src/lib/transformer.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { defineConfig } from 'mdsx';
import { getHighlighter } from 'shiki';
import { rehypeCustomHighlight } from '@mdsx/rehype-custom-highlighter';
import rehypePrettyCode from 'rehype-pretty-code';


const prettyCodeOptions = {
  theme: codeBlockTheme,
  getHighlighter: (options) =>
    getHighlighter({
      ...options,
      langs: [
        'plaintext',
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/svelte.mjs'),
        import('shiki/langs/shellscript.mjs'),
        import('shiki/langs/markdown.mjs')
      ]
    }),
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      // @ts-expect-error - we're changing the node type
      node.children = { type: 'text', value: ' ' };
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ['line--highlighted'];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['chars--highlighted'];
  }
};


// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks
export const mdsxConfig = defineConfig({
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [
    remarkMath,
    tableTransformer,
    // remarkAttr,
    imageTransformer,
    linkTransformer,
    headingTransformer,
    remarkCodeTitles
  ],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug, [rehypeCustomHighlight, customHighlightOptions]],
  blueprints: {
    default: {
      path: resolve(__dirname, './src/lib/components/markdown/blueprint.svelte')
    }
  }
});
