import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { createServer, getServerById } from '$lib/server/db/server';

export const load: PageServerLoad = async () => {
  return {
    newServerForm: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const { insertId: newServerId } = await createServer(form.data);

    const newServer = await getServerById(newServerId);

    return {
      form,
      newServer
    };
  }
};
