export interface Song {
	id: string;
	title: string;
	artist: Artist;
	duration: number;
	album?: Album;
	year: number;
	filename: string;
	addedAt: Date;
	cover: {
		format: string;
		type: string;
		description: string;
		data: Uint8Array;
	};
}

export interface Playlist {
	name: string;
	songs: Song[];
}

export interface Album {
	title: string;
	songs: Song[];
}

export interface Artist {
	id: number;
	name: string
}
