import highlighter from './src/lib/codeHighlighter.js';
import {visit} from 'unist-util-visit';

function linkTransformer() {
	return ( markdownAST ) => {
		visit(markdownAST, 'link', (node) => {
			console.log(node);

			// Do stuff with heading nodes
		});

		return markdownAST;
	};
}

const config = {
	extensions: ['.md', '.svx', '.mdx'],
	remarkPlugins: [linkTransformer],
	rehypePlugins: [],
	highlight: {
		highlighter
	},
	smartypants: false
};

export default config;
