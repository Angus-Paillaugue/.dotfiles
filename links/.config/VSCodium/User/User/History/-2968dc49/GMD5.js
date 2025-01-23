import { error, redirect } from '@sveltejs/kit';
import { postBySlug } from '$lib/pages';


export async function load({  params }) {
	const urlName = params.name;
  const post = await postBySlug(params.slug);
  if (!post) error(404, 'Post not found');

	// Redirect to the correct URL if the slug is incorrect or is missing the identifier
	const correctUrl = urlHealer.identifier.join(post.slug, post.id);
	if (urlName !== correctUrl)
		redirect(307, `/post/${urlHealer.identifier.join(post.slug, post.id)}`);


	const component = await import(`../../../docs/${params.slug}.md`);

	return {
		component: component.default,
		...post
	};
}
