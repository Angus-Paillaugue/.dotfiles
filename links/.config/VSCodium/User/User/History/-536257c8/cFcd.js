import { readdir } from 'fs/promises';
import { json } from "@sveltejs/kit"


/** @type {import('./$types').RequestHandler} */
export async function GET() {
  
  return json({ files });
};
