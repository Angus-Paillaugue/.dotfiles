import { writeFileSync } from 'fs';
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

  const res = writeFileSync(contents, path);
  console.log(res);

  return json({ success: true });
};
