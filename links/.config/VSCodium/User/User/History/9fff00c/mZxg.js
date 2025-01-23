import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	try {
		const [latestExercises] = await db.query(
			`
      SELECT DISTINCT
        e.id AS exercise_id,
        e.title,
        e.description,
        e.difficulty,
        e.created_at,
        CASE WHEN uep.completed_at IS NOT NULL THEN TRUE ELSE FALSE END AS solved
      FROM
        exercises e
      LEFT JOIN
        submissions uep ON e.id = uep.exercise_id AND uep.user_id = ?
      ORDER BY
        e.created_at DESC;
      `,
			[user.id]
		);
		latestExercises.map((exercise) => {
			exercise.created_at = exercise.created_at.toISOString();
		});
		return { latestExercises };
	} finally {
		db.end();
	}
}
import { error, redirect } from '@sveltejs/kit';
import { postById, postBySlug } from '$lib/server/posts';
import { urlHealer } from '$lib/utils';

export const load = async ({ params }) => {
	const urlName = urlHealer.sanitize(params.name);

	// Isolate the identifier at the end of the URL
	const identifier = urlHealer.identifier.separate(urlName);
	if (!identifier) {
		error(404, 'Post not found');
	}

	// Fetch the post by its identifier
	let post;
	if (identifier.id) {
		post = postById(identifier.id);
	}
	// If the identifier is a slug, fetch the post by its slug
	if (!post) {
		post = await postBySlug(identifier.slug);
		if (!post) error(404, 'Post not found');
	}

	// Redirect to the correct URL if the slug is incorrect or is missing the identifier
	const correctUrl = urlHealer.identifier.join(post.slug, post.id);
	if (urlName !== correctUrl)
		redirect(307, `/post/${urlHealer.identifier.join(post.slug, post.id)}`);

	return {
		post
	};
};
