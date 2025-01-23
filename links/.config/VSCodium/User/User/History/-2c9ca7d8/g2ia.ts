import { createNote } from "$lib/server/db/note";
import type { Note } from "$lib/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";


export const actions: Actions = {
  createNote: async ({ request, locals: { user } }) => {
    const formData = Object.fromEntries(await request.formData());
		const { newNoteTitle: title, newNoteType: type } = formData as {
			newNoteTitle: string;
			newNoteType: Note['type'];
	};

    if(title.length === 0) {
      return fail(400, { message: 'Title cannot be empty', form: 'createNote' });
    }

    const noteId = await createNote(user, title, type);

    throw redirect(303, `/${user.username}/${noteId}`);
  }
};
