import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  createNote: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
		const { newNoteTitle: title } = formData as { newNoteTitle: string };

    console.log(title)
  }
};
