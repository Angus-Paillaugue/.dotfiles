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
import { createHighlighter } from 'shiki';
import { rehypeCustomHighlight } from '@mdsx/rehype-custom-highlighter';


const customHighlightOptions = {
  highlight: async ({ value, lang }) => {
    const highlighter = await createHighlighter({
      langs: [lang],
      themes: [codeBlockTheme]
    });
    const html = highlighter.codeToHtml(value, {
      lang: lang,
      theme: codeBlockTheme
    });
    return html;
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
    imageTransformer,
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
