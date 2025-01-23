import { readFile } from 'fs/promises';
import { json } from "@sveltejs/kit"
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const path = path.join(process.cwd(), 'files', 'server.js');
  const files = await listFilesRecursively(path.join(process.cwd(), 'files'));
  return json({ files });
};
