import { getUserItems } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { user }, params}) {
  console.log(params);
  
  const items = await getUserItems({ user });
  return { items };
};
