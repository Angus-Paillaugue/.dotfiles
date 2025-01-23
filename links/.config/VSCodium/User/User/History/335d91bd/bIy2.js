import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET( { request}) {
  const params = request.params;
  return json({ test: "test" });
};
