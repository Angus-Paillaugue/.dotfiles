
type NoteType = 'text' | 'list';
export interface User {
	id: number;
	username: string
	password: string;
	createdAt: Date;
}

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

interface ListNoteItem {
  id: number;
  item: string;
  checked: boolean;
  position: number;
}

export interface ListNote extends CoreNote {
	type: 'list';
	items: ListNoteItem[];
}
