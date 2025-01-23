import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';
import highlighter from './src/lib/codeHighlighter.js';
import rehype_katex from 'rehype-katex';
import math from 'remark-math';
import {visit} from 'unist-util-visit';
import katex from 'katex';


const correct_hast_tree = () => (tree) => {
  visit(tree, 'text', (node) => {
    if (node.value.trim().startsWith('<')) {
      node.type = 'raw';
    }
  });
};

const katex_blocks = () => (tree) => {
  visit(tree, 'code', (node) => {
    if (node.lang === 'math') {
      const str = katex.renderToString(node.value, {
        displayMode: true,
        leqno: false,
        fleqn: false,
        throwOnError: true,
        errorColor: '#cc0000',
        strict: 'warn',
        output: 'htmlAndMathml',
        trust: false,
        macros: { '\\f': '#1f(#2)' }
      });

      node.type = 'raw';
      node.value = '{@html `' + str + '`}';
    }
  });
};

// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks
const config = {
  extensions: ['.md', '.svx'],
  remarkPlugins: [math, katex_blocks, remarkUnwrapImages, remarkCodeTitles],
  rehypePlugins: [
    correct_hast_tree,
    rehype_katex,
    rehypeSlug,
  ],
  highlight: {
    highlighter
  }
};

export default config;
