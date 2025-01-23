
import type { User, Note, CoreNote } from '$lib/types';
import db from '.';


export async function getUsersNote(user: User): Promise<Note[]> {
	return null;
}

export async function getNote(noteId: Note['id']) {
	const query = "SELECT * FROM notes WHERE id = ?";

	const [rows] = await db.execute(query, [noteId]);
	if (rows.length === 0) {
		return null;
	}
	const coreNote = rows[0] as CoreNote;
	if(coreNote.type === 'text') {
		const [textRows] = await db.execute("SELECT * FROM text_notes WHERE note_id = ?", [noteId]);
		const textNote = textRows[0];
		return {
			...coreNote,
			content: textNote.content
		};
	}
}
