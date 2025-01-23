import { pb } from '$lib/db';

export async function getUserItems({ user, page = 0 }) {
	const NUMBER_OF_ITEMS_PER_PAGE = 25;

	const items = await pb
		.collection('item')
		.getList(page, page * NUMBER_OF_ITEMS_PER_PAGE + NUMBER_OF_ITEMS_PER_PAGE, {
			sort: '-created',
			filter: `owner = '${user.id}'`
		});

	return items;
}

export async function getItem(id) {
	if (!id) throw new Error('No item ID provided');

	const item = await pb.collection('item').getOne(id);
	if (!item) throw new Error('Item not found');

	return item;
}


export async function updateItem(id, data) {
	const item = await getItem(id);
	if (!item) throw new Error('Item not found');

	const updatedItem = Object.assign(item, data);

	delete updatedItem.updated;
	delete updatedItem.created;

	const record = await pb.collection('item').update(item.id, updatedItem);

	return record;
}
