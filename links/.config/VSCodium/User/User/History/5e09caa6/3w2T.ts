import { redirect } from '@sveltejs/kit';


export const load = (async ({ locals, cookies }) => {
  locals.user = undefined;
  cookies.delete('token', { path: '/' });

  throw redirect(303, '/');
}) satisfies PageServerLoad;
