import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { json } from "@sveltejs/kit"


/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  const { path } = await request.json();

  const files = await readdir(path)
  return json({ success: true });
};
