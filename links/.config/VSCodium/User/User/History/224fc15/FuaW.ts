export interface Song {
	id: string;
	title: string;
	artist: Artist;
	duration: number;
	album?: Album;
	year: number;
	mediaType: 'flac';
	addedAt: Date;\
	filePath: string;
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
