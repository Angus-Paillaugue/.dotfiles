import { readFile } from 'fs/promises';
import { json } from "@sveltejs/kit";
import { join } from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const path = join(process.cwd(), url.searchParams.get('path'));
  const contents = await readFile(join(process.cwd(), 'files', path));
  return json({ contents });
};
