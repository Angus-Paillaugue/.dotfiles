import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { exec } from 'child_process';
import path from 'path';

async function downloadSong(songId: string) {

	const outputDir = path.resolve(__dirname, 'songs');
	const command = `yt-dlp -x --audio-format mp3 --audio-quality 320k \
      --embed-thumbnail --embed-metadata \
      -o "${outputDir}/%(uploader)s - %(title)s.%(ext)s" \
      "https://www.youtube.com/watch?v=${songId}"`;

	return new Promise<void>((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error('Error downloading song:', stderr);
				return reject(error);
			}
			console.log('Song downloaded successfully:', stdout);
			resolve();
		});
	});
}

export const POST: RequestHandler = async ({ request }) => {
  const { songId } = await request.json();
  if (!songId) {
    throw new Error('Song ID is required.');
  }
  console.log('Downloading song with id:', songId);

  return json({ success: true, message: 'Song downloaded successfully.' });
};
