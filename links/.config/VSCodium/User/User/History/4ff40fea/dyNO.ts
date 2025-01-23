
export interface User {
	id: number;
	username: string
	password: string;
	createdAt: Date;
	notes: Note[];
}

type NoteType = 'text' | 'list';

export interface CoreNote {
	id: number;
	title: string;
	type: NoteType;
	createdAt: Date;
	updatedAt: Date;
  user: User;
}

export interface TextNote extends CoreNote {
  type: 'text';
  content: string;
}

export interface ListNoteItem {
  id: number;
  item: string;
  checked: boolean;
  position: number;
}

export interface ListNote extends CoreNote {
	type: 'list';
	items: ListNoteItem[];
}

export type Note = TextNote | ListNote;
