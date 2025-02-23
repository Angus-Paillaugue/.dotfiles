import rehypeSlug from 'rehype-slug';
import highlighter from './src/lib/codeHighlighter.js';

const config = {
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [],
  rehypePlugins: [rehypeSlug],
  highlight: {
    highlighter
  },
  smartypants: false
};

export default config;
