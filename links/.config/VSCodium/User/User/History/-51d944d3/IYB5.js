import { compile } from 'mdsvex';
import highlighter from '$lib/codeHighlighter';

export async function POST({ request }) {
	const { text } = await request.json();

	const compiled = (
		await compile(text, {
			highlight: { highlighter }
		})
	).code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');

	return new Response(compiled, { status: 200 });
}
