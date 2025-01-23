import type { PageServerLoad, Actions } from './$types.js';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { createServer, getAllServers } from '$lib/server/db/server';

export const load: PageServerLoad = async () => {
  try {
    const servers = await getAllServers();
    throw new Error('test');
    return {
      servers,
      newServerForm: await superValidate(zod(formSchema))
    };
  } catch (e: (unknown as Error)) {
    throw error(500, e.message);
  }
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const newServer = await createServer(form.data);

    return {
      form,
      serverId: newServer.insertId
    };
  }
};
