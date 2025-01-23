
import type { User, Note } from '$lib/types';
import db from '.';


export async function getUsersNote(user: User): Promise<Note[]> {
	return null;
}

export async function getNote(noteId: Note['id']) {
	
}
