import { error } from '@sveltejs/kit';
import { postBySlug } from '$lib/pages';


export async function load({  params }) {

  const post = await postBySlug(params.slug);
  if (!post) error(404, 'Post not found');

	console.log(`../../../docs/${params.slug}.md`);
	const component = await import(`../../../docs/${params.slug}.md`);
	

	return {
		component: component.default,
		...post
	};
}
