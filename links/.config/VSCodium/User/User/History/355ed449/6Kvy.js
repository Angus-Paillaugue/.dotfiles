import { readFile } from 'fs/promises';
import { json } from "@sveltejs/kit";
import { join } from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const path = join(process.cwd(), 'files', url.searchParams.get('path'));
  const contents = await readFile(path);
  return json({ contents });
};
