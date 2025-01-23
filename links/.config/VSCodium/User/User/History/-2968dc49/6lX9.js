export async function load({ data }) {
	const component = await import(`../../../docs/${data.post.slug}.md`);

	return {
		component: component.default,
		...data
	};
}
