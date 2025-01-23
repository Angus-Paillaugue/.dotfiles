import { auth } from '$lib/server/auth';
import { isUsername } from '$lib/utils';
import { error } from '@sveltejs/kit';

const canUserNavigate = (path: string, loggedIn: boolean) => {
  if(isUsername(path.slice(1).split('/')[0]) && !loggedIn) {
    return false;
  }

  return true;
}

export const handle = async ({ event, resolve }) => {
  const { cookies, locals, url } = event;
  const token = cookies.get('token') || false;

  // Check if the user is logged in, and if so, retrieve the user data
  if (token) {
    try {
      const user = await auth(token);
      if (user) {
        locals.user = user;
      } else {
        cookies.delete('token', { path: '/' });
        delete locals.user;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      delete locals.user;
      cookies.delete('token', { path: '/' });
    }
  }

  if (!canUserNavigate(url.pathname, 'user' in locals)) {
    throw error
  }

  return await resolve(event);
};
