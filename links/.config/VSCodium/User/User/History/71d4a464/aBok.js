import path from 'node:path';
import fs from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import { log } from 'node:console';

export const GET = async ({ params }) => {
	const { id: userId } = params;
	log
	const DEFAULT_PROFILE_PICTURE = `${env.PWD}/uploads/profile_pictures/default_avatar.jpg`;
	const pathName = path.resolve(`${env.PWD}/uploads/profile_pictures`, userId+'.webp');

	try {
		const file = await fs.readFile(pathName);
		return new Response(file);
	} catch {
		const file = await fs.readFile(DEFAULT_PROFILE_PICTURE);
		return new Response(file);
	}
};
