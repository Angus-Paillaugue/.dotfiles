import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { json } from "@sveltejs/kit"
import { join } from 'path'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let { contents, path } = await request.json();
  console.log(path);
  
  path = join(process.cwd(), 'files', path);
  const exists = existsSync(path);
  if(!exists) return json({ error: 'File does not exist' }, { status: 404 });

  await writeFile(contents, path);
  return json({ success: true });
};
