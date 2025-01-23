import { API_URL } from '$lib/constants';
import { getServerById, deleteServer, updateServer } from '$lib/server/db/server';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const { id } = params;

  try {
    const server = await getServerById(parseInt(id));
    if (!server) {
      throw error(404, 'Server not found');
    }
    return { server };
  } catch (err: unknown) {
    throw error(500, err as string);
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  deleteServer: async ({ params: { id } }) => {
    try {
      const success = await deleteServer(parseInt(id));

      if (!success) {
        return fail(500, { error: true, message: 'Failed to delete server' });
      }
    } catch (err: unknown) {
      fail(500, { error: true, message: err as string });
    }

    const res = await fetch(API_URL'/api/post/createdServer', {

    throw redirect(303, '/app/servers');
  },
  editServer: async ({ params: { id }, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const {
      deleteServerNameInput: name,
      deleteServerDescriptionInput: description,
      deleteServerPublicUrlInput: publicUrl
    } = formData as {
      deleteServerNameInput: string;
      deleteServerDescriptionInput: string;
      deleteServerPublicUrlInput: string;
    };

    try {
      const status = await updateServer(parseInt(id), {
        name,
        description,
        publicUrl
      });

      if (!status) {
        return fail(500, { error: true, message: 'Failed to update server' });
      }

      return { success: true, message: 'Server updated' };
    } catch (error) {
      return fail(500, { error: true, message: error as string });
    }
  }
};
