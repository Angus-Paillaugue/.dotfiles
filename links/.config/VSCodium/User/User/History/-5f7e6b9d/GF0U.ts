import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';
import highlighter from './src/lib/codeHighlighter.js';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkAttr from 'remark-attr';
import {
  imageTransformer,
  linkTransformer,
  headingTransformer,
  tableTransformer
} from './src/lib/transformer.js';

// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks
const config = {
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [
    remarkMath,
    tableTransformer,
    remarkAttr,
    imageTransformer,
    linkTransformer,
    headingTransformer,
    remarkCodeTitles
  ],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug],
  highlight: {
    highlighter
  }
};

export default config;
interface mdsvexConfig {
  extensions: string[];
  remarkPlugins: any[];
  rehypePlugins: any[];
  highlight: {
    highlighter: (code: string, lang: string, meta: string) => Promise<string>;
  };
};
