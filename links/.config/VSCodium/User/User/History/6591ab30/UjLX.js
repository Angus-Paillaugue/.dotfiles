import { getExerciseDetails } from '$lib/server/db/exercises';
import { error, redirect } from '@sveltejs/kit';
import { urlHealer } from '$lib/utils';

export const load = async ({ params, locals }) => {
	const urlSlug = urlHealer.sanitize(params.slug);
	const { user: { id: userId } } = locals;

	// Isolate the identifier at the end of the URL
	const identifier = urlHealer.identifier.separate(urlSlug);
	if (!identifier) {
		throw new error(404, 'Exercise not found');
	}

    try {
        const exercise = await getExerciseDetails(userId, identifier);

        // Redirect to the correct URL if the slug is incorrect or is missing the identifier
        const correctUrl = urlHealer.identifier.join(exercise.slug, exercise.exercise_id);
        if (urlSlug !== correctUrl) redirect(307, `/app/exercises/${correctUrl}`);

        return {
            exercise
        };
    }
        throw new error(404, 'Exercise not found');
    }

};
