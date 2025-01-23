import path from 'node:path'
import fs from 'node:fs/promises'
import { error } from '@sveltejs/kit'

export const GET = async ({ params }) => {
  console.log(params.path);

  const pathName = path.resolve('/profile_picture' , params.path)

  try {
      const file = await fs.readFile(pathName)
      return new Response(file)
  } catch {
      throw error(404) // use 404 (not found) here
  }
}
