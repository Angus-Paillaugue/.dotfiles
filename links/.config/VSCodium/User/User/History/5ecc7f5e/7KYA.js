import path from 'node:path'
import fs from 'node:fs/promises'
import { error } from '@sveltejs/kit'

export const GET = async ({ params }) => {
  const pathName = path.resolve('uploads/profile_pictures' , params.path)

  try {
    const file = await fs.readFile(pathName)
    return new Response(file)
  } catch {
    throw new error(404)
  }
}
