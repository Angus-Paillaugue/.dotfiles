import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;

	const item = await locals.pb.collection('items').getOne(id);
	if (!item) throw new Error('Item not found');
	const isOwner = locals.user?.id === item.owner;
	let items = [];
	if (isOwner) {
		items = await locals.pb.collection('items').getFullList({
			sort: '-created',
			requestKey: null
		});
	}

	return { item, items, isOwner };
}

/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, params, locals }) => {
		try {
			const { id } = params;
			const formData = await request.formData();
			const formEntries = Object.fromEntries(formData);
			let { brand, name, type, image, description, link } = formEntries;
			let color = formData.getAll('color[]');

			// Form error handling
			if (!name) return { message: 'create.item.noName', type: 'save' };
			if (name.length > 30) return { message: 'create.item.nameTooLong', type: 'save' };
			if (color.length === 0) return { message: 'create.item.noColor', type: 'save' };
			if (type == undefined) return { message: 'create.item.noType', type: 'save' };
			if (!brand) return { message: 'create.item.noBrand', type: 'save' };
			if (!image.size === 0) return { message: 'create.item.noImage', type: 'save' };
			if (formEntries.image.size === 0) delete formEntries.image;

			const item = await locals.pb.collection('items').getOne(id);
			let updatedItem = Object.assign(item, {
				brand,
				name,
				type,
				color,
				description,
				link
			});
			// Removing background from image
			if (image.size !== 0) item.image = image;

			await locals.pb.collection('items').update(item.id, updatedItem);

			const bdItem = await locals.pb.collection('items').getOne(id);
			return { updatedItem: bdItem, success: true, message: 'item.update.saved' };
		} catch (error) {
			console.log(error);
			return {
				message:
					Object.values(error?.response?.data ?? [])
						.map((el) => el.message)
						.join('<br>') || 'settings.error',
				success: false,
				text: error?.response?.data ? 'raw' : '',
				type: 'updateItem'
			};
		}
	},
	delete: async ({ params, locals }) => {
		const { id } = params;
		await locals.pb.collection('items').delete(id);

		throw redirect(303, '/items');
	}
};
