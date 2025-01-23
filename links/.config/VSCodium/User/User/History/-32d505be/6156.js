import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { json } from "@sveltejs/kit"


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { contents, path } = await request.json();
  const exists = existsSync(path);
  if(!exists) return json({ error: 'File does not exist' }, { status: 404 });

  await writeFile(contents, path);
  return json({ success: true });
};
