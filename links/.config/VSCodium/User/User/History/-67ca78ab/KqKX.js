import highlighter from './src/lib/codeHighlighter.js';

function linkTransformer() {
	return ({ markdownAST }) => {
		visit(markdownAST, 'heading', (node) => {
			// Do stuff with heading nodes
		});

		return markdownAST;
	};
}

const config = {
	extensions: ['.md', '.svx', '.mdx'],
	remarkPlugins: [],
	rehypePlugins: [],
	highlight: {
		highlighter
	},
	smartypants: false
};

export default config;
