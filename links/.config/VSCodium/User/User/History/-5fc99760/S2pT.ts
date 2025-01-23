
import type { User, Note, CoreNote } from '$lib/types';
import db from '.';


export async function getUsersNote(user: User): Promise<Note[]> {
	const query = "SELECT id FROM notes WHERE user_id = ?";
	const [rows] = await db.execute(query, [user.id]);
	const noteIds = rows.map((row) => row.id);
	const notes = await Promise.all(noteIds.map(getNote));

	return notes.filter(Boolean) as Note[];
}

export async function getNote(noteId: Note['id']) {
	const query = "SELECT * FROM notes WHERE id = ?";

	const [rows] = await db.execute(query, [noteId]);
	if (rows.length === 0) {
		return null;
	}
	const coreNote = rows[0] as CoreNote;
	if(coreNote.type === 'text') {
		const [textRows] = await db.execute('SELECT * FROM text_note_content WHERE note_id = ?', [
			noteId
		]);
		const textNote = textRows[0] as { content: string };
		return {
			...coreNote,
			content: textNote.content
		};
	} else {
		const [listRows] = await db.execute('SELECT * FROM list_note_content WHERE note_id = ?', [
			noteId
		]);
		const items = listRows.map((row) => ({
			id: row.id,
			item: row.item,
			checked: row.checked,
			position: row.position
		}));
		return {
			...coreNote,
			items
		};
	}
}
