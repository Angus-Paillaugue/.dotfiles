import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  createNote: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
		const { newNoteTitle: title } = formData as { newNoteTitle: string };

    console.log(title)
    if(title.length === 0) {
      return fail(400, { message: 'Title cannot be empty', form: 'createNote' });
    }
  }
};
