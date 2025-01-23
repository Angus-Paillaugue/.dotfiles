/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id } = params;
  console.log('id', id);

    return {};
};
