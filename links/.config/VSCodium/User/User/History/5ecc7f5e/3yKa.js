import path from 'node:path'
import fs from 'node:fs/promises'
import { error } from '@sveltejs/kit'

export const GET = async ({ params }) => {

  const pathName = path.resolve('static/profile_picture' , params.path)

  try {
    const file = await fs.readFile(pathName)
    return new Response(file)
  } catch {
    throw new error(404)
  }
}
