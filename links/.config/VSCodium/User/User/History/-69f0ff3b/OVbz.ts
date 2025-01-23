import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { spawn } from 'child_process';
import fs from 'fs';
import { join } from 'path';
import { saveSongCover, getSongInfoFromId, incompleteDirName, songsDirName, getSongIdFromFilename, coverDirName } from '$lib/songs';
import { addSong } from '$lib/db/song';
import { readdir, rename, unlink } from 'fs/promises';
import type { Song } from '$lib/types';

const completeDir = './songs';
const incompleteDir = join(completeDir, incompleteDirName);

const getPlaylistNameFromSTDOUT = (stdout: string) => {
	const lines = stdout.split('\n');
	const match = '[download] Downloading playlist: ';
	const line = lines.find((line) => line.includes(match));
	return line ? line.split(match)[1].trim() : '';
};

export const POST: RequestHandler = async ({ request }) => {
	const { songId, format } = await request.json();
	if (!songId) {
		throw new Error('Song ID is required.');
	}

	try {
		const songExists = await getSongInfoFromId(songId);
		return json(
			{ message: 'Song already exists.', song: songExists },
			{ status: 400 }
		);
	} catch (_e) {}

	const command = [
		'yt-dlp',
		'-x',
		`--audio-format=${format}`,
		'--audio-quality=320k',
		'--write-thumbnail',
		'--embed-thumbnail',
		'--convert-thumbnails=png',
		'--embed-metadata',
		`-o${incompleteDir}/%(id)s.%(ext)s`,
		`https://www.youtube.com/watch?v=${songId}`
	];

	let songName = '';
	let streamClosed = false;

	try {
		const c = spawn(command[0], command.slice(1));

		const stream = new ReadableStream({
			start(controller) {
				// Handle child process stdout
				c.stdout.on('data', (data) => {
					if (streamClosed) return;
					const stdout = data.toString();

					if (!songName) {
						const name = getSongNameFromSTDOUT(stdout);
						if (name) {
							songName = name;
							controller.enqueue(JSON.stringify({ event: 'songName', data: songName }));
						}
					}
				});

				// Handle child process exit
				c.on('exit', async () => {
					if (streamClosed) return;
					// Move file to the complete directory
					const files = await readdir(incompleteDir);
					let song: Song | undefined;

					for (const file of files) {
						const filePath = join(incompleteDir, file);
						if (file.endsWith(`.${format}`)) {
							try {
								await rename(filePath, join(songsDirName, file));
								song = await getSongInfoFromId(getSongIdFromFilename(file));
								const songCoverPath = await saveSongCover(song.id);
								song.coverPath = songCoverPath;
								await addSong(song);
							} catch (_e) {
								controller.enqueue(
									JSON.stringify({
										event: 'error',
										data: "Couldn't add song to database."
									})
								);
							}
						} else if (file.endsWith('.png')) {
							// Move cover image to cover directory
							try {
								await rename(filePath, join(songsDirName, coverDirName, file));
							} catch (_e) {
								controller.enqueue(
									JSON.stringify({
										event: 'error',
										data: "Couldn't move cover image."
									})
								);
							}
						} else {
							// Is an artifact file, delete it
							await unlink(filePath);
						}
					}
					controller.enqueue(JSON.stringify({ event: 'end', data: song }));
					controller.close();
					streamClosed = true;
				});
			},
			async cancel() {
				streamClosed = true;
				c.kill();
				// Delete any incomplete file
				const files = fs.readdirSync(incompleteDir);
				files.forEach((file) => {
					if (file.includes(songId)) {
						fs.unlinkSync(join(incompleteDir, file));
					}
				});
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch (error) {
		console.error(error);
		return json({ event: 'error', data: 'An error occurred.' }, { status: 500 });
	}
};
