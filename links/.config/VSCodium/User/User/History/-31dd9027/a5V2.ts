import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { createServer } from '$lib/server/db/server';
import type { Server } from 'lucide-svelte';

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

    const newServer = await createServer(form as unknown as Server);
    console.log(newServer);

    return {
      form
    };
  }
};
3
