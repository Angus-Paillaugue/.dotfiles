import { getServerById, deleteServer } from '$lib/server/db/server';
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

    throw redirect(303, '/app/servers');
  },
  editServer: async ({ params: { id }, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const {
      deleteServerNameInput: name,
      deleteServerDescriptionInput,
      deleteServerPublicUrlInput
    } = formData as {
      deleteServerNameInput: string;
      deleteServerDescriptionInput: string;
      deleteServerPublicUrlInput: string;
    };

    console.log(formData, name, description, publicUrl);
  }
};
