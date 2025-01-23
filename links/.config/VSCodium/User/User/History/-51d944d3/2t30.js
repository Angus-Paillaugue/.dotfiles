import compileMarkdown from '$lib/utils';

export async function POST({ request }) {
	const { text } = await request.json();

	try {
		const compiled = await compileMarkdown(text);

		return new Response(compiled, { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.message), { status: 500 });
	}

}
