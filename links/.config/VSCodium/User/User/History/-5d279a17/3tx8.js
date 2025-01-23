/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id } }) {
  return { id };
};
