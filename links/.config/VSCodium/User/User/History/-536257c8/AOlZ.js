import { readdir } from 'fs/promises';
import { json } from "@sveltejs/kit"
import path from 'path';


/** @type {import('./$types').RequestHandler} */
export async function GET() {
  async function listFilesRecursively(dir) {
    let files = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await listFilesRecursively(fullPath));
      } else {
        files.push(fullPath.replace(process.cwd(), 'files'));
      }
    }
    return files;
  }

  const files = await listFilesRecursively(path.join(process.cwd(), 'files'));
  return json({ files });
};
