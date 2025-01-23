import { error, redirect } from '@sveltejs/kit';
import { postById, postBySlug } from '$lib/server/posts';
import { urlHealer } from '$lib/utils';
export async function load({ data, params }) {
	const urlName = params.name;
  const post = await postBySlug(identifier.slug);
  if (!post) error(404, 'Post not found');

	// Redirect to the correct URL if the slug is incorrect or is missing the identifier
	const correctUrl = urlHealer.identifier.join(post.slug, post.id);
	if (urlName !== correctUrl)
		redirect(307, `/post/${urlHealer.identifier.join(post.slug, post.id)}`);

	return {
		post
	};

	const component = await import(`../../../docs/${data.post.slug}.md`);

	return {
		component: component.default,
		...data
	};
}
