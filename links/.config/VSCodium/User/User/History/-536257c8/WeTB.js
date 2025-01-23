import { readdir } from 'fs/promises';
import { json } from "@sveltejs/kit"


/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const path = url.searchParams.get('path');

  const files = (await readdir(path)) || [];
  return json({ files });
};
