import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getSongInfo, getSongPath } from '$lib/songs';

async function downloadSong(songId: string) {
	const completeDir = './songs';
	const incompleteDir = completeDir + '/incomplete/';
	if (!fs.existsSync(incompleteDir)) {
		fs.mkdirSync(incompleteDir, { recursive: true });
	}
	if (!fs.existsSync(completeDir)) {
		fs.mkdirSync(completeDir, { recursive: true });
	}

	const command = `yt-dlp -x --audio-format flac --audio-quality 320k \
      --embed-thumbnail --embed-metadata \
      -o "${incompleteDir}/${songId}.%(ext)s" \
      "https://www.youtube.com/watch?v=${songId}"`;

	return new Promise<void>((resolve, reject) => {
		exec(command, async (error, stdout, stderr) => {
			if (error) {

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

			const path = getSongPath(songId);
			const song = await getSongInfo(getSongPath(songId));

			resolve();
		});
	});
}

export const POST: RequestHandler = async ({ request }) => {
  const { songId } = await request.json();
  if (!songId) {
    throw new Error('Song ID is required.');
  }
	await downloadSong(songId);

  return json({ success: true, message: 'Song downloaded successfully.' });
};
