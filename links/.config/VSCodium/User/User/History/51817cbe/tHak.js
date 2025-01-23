import { compile } from 'mdsvex';
import highlighter from '$lib/codeHighlighter';
export async function compileMarkdown(md) {
	const compiled = (
		await compile(md, {
			highlight: { highlighter }
		})
	).code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');
	return compiled;
}
