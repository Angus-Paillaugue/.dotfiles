export interface Song {
	id: string;
	path: string;
	title: string;
	artist: string;
	duration: number;
	album?: string;
	year: number;
	cover: HTMLImageElement;
}
