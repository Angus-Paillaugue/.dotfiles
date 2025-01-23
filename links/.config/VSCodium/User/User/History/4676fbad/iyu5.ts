import type { LayoutServerLoad } from './$types';
import { fetchData } from '$lib/pantry';

export const load = (async () => {

	// const fetchedPantryData = await fetchData();
	// console.log(fetchedPantryData);

	return { fetchedPantryData };
}) satisfies LayoutServerLoad;
