
import type { User, Note, CoreNote, ListNoteItem, ListNote, TextNote } from '$lib/types';
import db from '.';


export async function getUsersNote(user: User): Promise<Note[]> {
	const query = "SELECT id FROM note WHERE user_id = ?";
	const [rows] = await db.execute(query, [user.id]);
	const noteIds = rows.map((row) => row.id);
	const notes = await Promise.all(noteIds.map(getNote));

	return notes.filter(Boolean) as Note[];
}

export async function getNote(noteId: Note['id']): Promise<Note> {
	const query = "SELECT * FROM note WHERE id = ?";

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
		} as TextNote;
	} else {
		const [listRows] = await db.execute('SELECT * FROM list_note_content WHERE note_id = ? ORDER BY position ASC', [
			noteId
		]);
		const items = listRows.map((row) => ({
			id: row.id,
			item: row.item,
			checked: row.checked === 1,
			position: row.position
		}));
		return {
			...coreNote,
			items
		} as ListNote;
	}
}


export async function createNote(
	user: User,
	title: string,
	type: CoreNote['type']
): Promise<Note['id']> {
	let query = "INSERT INTO note (user_id, title, type) VALUES (?, ?, ?)";
	const [result] = await db.execute(query, [user.id, title, type]);
	if(type === 'text') {
		query = "INSERT INTO text_note_content (note_id, content) VALUES (?, '')";
		await db.execute(query, [result.insertId]);
	}
	return result.insertId;
}


export async function addItemToListNote(
	noteId: Note['id'],
	item: ListNoteItem['item'],
	position: ListNoteItem['position']
): Promise<ListNoteItem['id']> {
	const query = 'INSERT INTO list_note_content (note_id, item, position) VALUES (?, ?, ?)';
	const [result] = await db.execute(query, [noteId, item, position]);
	return result.insertId;
}

export async function saveListNote(note: ListNote): Promise<void> {
  let query = 'UPDATE list_note_content SET item = ?, checked = ?, position = ? WHERE id = ?';
  await Promise.all(note.items.map((item) => db.execute(query, [item.item, item.checked, item.position, item.id])));

  query = 'UPDATE note SET title = ? WHERE id = ?';
  await db.execute(query, [note.title, note.id]);

  // Handle items to delete
  const itemIds = note.items.map((item) => item.id);
  query = `DELETE FROM list_note_content WHERE note_id = ? AND id NOT IN (${itemIds.map(() => '?').join(', ')})`; // Note that this solution is janky and not secure
  await db.execute(query, [note.id, ...itemIds]);

  // Handle new items
  const newItems = note.items.filter((item) => item.id === -1);
  await Promise.all(newItems.map((item) => addItemToListNote(note.id, item.item, item.position)));
}

export async function saveTextNote(note: TextNote): Promise<void> {
  const query = 'UPDATE text_note_content SET content = ? WHERE note_id = ?';
  await db.execute(query, [note.content, note.id]);
}

export async function saveNote(note: Note): Promise<Note> {
  if(note.type === 'list') {
	  await saveListNote(note as ListNote);
  } else if(note.type === 'text') {
	  await saveTextNote(note as TextNote);
  }

  note = await getNote(note.id);

  return note;
}
