import { compileMarkdown } from '$lib/utils';

export async function POST({ request }) {
	const { text } = await request.json();

	const compiled = await compileMarkdown(text);

	return new Response(compiled, { status: 200 });
}
