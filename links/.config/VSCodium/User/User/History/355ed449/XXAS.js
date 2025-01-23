import { readFile } from 'fs/promises';
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const path = path.join(process.cwd(), url.searchParams.get('path'));
  const file = await readFile(process.cwd(), 'files', path);
  return json({ file });
};
