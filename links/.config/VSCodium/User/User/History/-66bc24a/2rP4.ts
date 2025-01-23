import type { Artist } from '$lib/types';
import db from '.';
import { type ResultSetHeader, type RowDataPacket } from 'mysql2';
import { getAllSongs } from './song';
import puppeteer from 'puppeteer';
import { createWriteStream } from 'fs';
import { request } from 'https';
import { join } from 'path';
import { artistCoverDir } from '$lib/songs';

export async function getAllArtists() {
	const query = 'SELECT * FROM artist';
	const [artists] = await db.execute<RowDataPacket[]>(query);

	return artists as Artist[];
}

export async function createArtist(artist: Artist): Promise<number> {
	const exists = async () => {
		const query = 'SELECT * FROM artist WHERE name = ?';
		const [rows] = await db.execute<RowDataPacket[]>(query, [artist.name]);
		return rows as Artist[];
	};

	const artistExists = await exists();
	if (artistExists.length > 0) {
		return (artistExists[0] as unknown as Artist).id;
	} else {
		const query = 'INSERT INTO artist (name) VALUES (?)';
		const [row] = await db.execute<ResultSetHeader>(query, [artist.name]);
		await downloadArtistPicture(artist.name, row.insertId);
		return row.insertId;
	}
}

export async function getArtistSongs(artist: Artist) {
	const allSongs = await getAllSongs();
	return allSongs.filter((song) => song.artist.id === artist.id);
}

export async function downloadArtistPicture(name: Artist['name'], id: Artist['id']) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	// Format the artist name for the Wikipedia URL
	const formattedName = name.replace(/\s+/g, '_');
	const url = `https://en.wikipedia.org/wiki/${formattedName}`;

	try {
		await page.goto(url);

		// Scrape the artist's image URL
		const imageUrl = await page.$eval('.infobox img', (img) => img.src);

		await browser.close();

		const imageFilename = join(artistCoverDir, `${id}.jpg`);

		request(imageUrl).pipe(createWriteStream(imageFilename));

		return imageFilename;
	} catch (error) {
		console.error(`Failed to scrape data for ${name}:`, error);
		await browser.close();
		return null;
	}

}
