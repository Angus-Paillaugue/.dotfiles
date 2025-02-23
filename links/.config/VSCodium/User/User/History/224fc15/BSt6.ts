

export interface Song {
	id: string;
	title: string;
	artist: Artist;
	duration: number;
	album?: Album;
	year: number;
	mediaType: 'flac' | 'mp3';
	addedAt: Date;
	filePath: string;
	coverPath: string;
}

export interface Playlist {
	id: number;
	title: string;
	songs: Song[];
}

export interface Album {
	id: number;
	title: string;
	songs: Song[];
}

export interface Artist {
	id: number;
	name: string
}
