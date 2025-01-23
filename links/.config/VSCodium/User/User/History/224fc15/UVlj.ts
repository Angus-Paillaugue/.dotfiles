export interface Song {
  path: string;
  title: string;
  artist: string;
  duration: number;
  album?: string;
  year: number;
  picture: {
    format: string,
    type: string,
    description: string,
    data: Uint8Array
  }
}
