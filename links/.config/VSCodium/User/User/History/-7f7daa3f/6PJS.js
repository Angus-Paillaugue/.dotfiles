import rehypeSlug from 'rehype-slug';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkAttr from 'remark-attr';

const config = {
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [remarkMath, remarkAttr],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug],
  smartypants: false
};

export default config;
