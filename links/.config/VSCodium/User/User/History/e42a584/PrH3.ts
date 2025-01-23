import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

async function downloadSong(songId: string) {
	const completeDir = './songs';
	const incompleteDir = completeDir + '/incomplete/';
	if (!fs.existsSync(incompleteDir)) {
		fs.mkdirSync(incompleteDir, { recursive: true });
	}
	if (!fs.existsSync(completeDir)) {
		fs.mkdirSync(completeDir, { recursive: true });
	}

	const command = `yt-dlp -x --audio-format mp3 --audio-quality 320k \
      --embed-thumbnail --embed-metadata \
      -o "${incompleteDir}/%(uploader)s - %(title)s.%(ext)s" \
      "https://www.youtube.com/watch?v=${songId}"`;

	return new Promise<void>((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error('Error downloading song:', stderr);

				// Delete any incomplete file
				const files = fs.readdirSync(incompleteDir);
				files.forEach((file) => {
					if (file.includes(songId)) {
						fs.unlinkSync(path.join(incompleteDir, file));
					}
				});

				return reject(error);
			}

			// Move file to the complete directory
			const files = fs.readdirSync(incompleteDir);
			files.forEach((file) => {
				const oldPath = path.join(incompleteDir, file);
				const newPath = path.join(completeDir, file);
				fs.renameSync(oldPath, newPath);
			});

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

	await downloadSong(songId);

  return json({ success: true, message: 'Song downloaded successfully.' });
};
