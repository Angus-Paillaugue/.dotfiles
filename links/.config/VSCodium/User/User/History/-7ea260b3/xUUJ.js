import { isValidEmail } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) throw redirect(301, '/log-in');
	const { user } = locals;

	return { user };
}

/** @type {import('./$types').Actions} */
export const actions = {
	changeEmail: async ({ request, locals }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { email } = formData;
			if (!email || !isValidEmail(email)) {
				return {
					message: 'settings.emailChange.invalidEmail',
					type: 'emailChange',
					success: false
				};
			}
			await locals.pb.collection('users').requestEmailChange(email);
			return { message: 'settings.emailChange.success', type: 'emailChange', success: true };
		} catch (error) {
			return {
				message:
					Object.values(error?.response?.data)
						.map((el) => el.message)
						.join('<br>') || 'settings.error',
				success: false,
				text: 'raw',
				type: 'emailChange'
			};
		}
	},
	changeUsername: async ({ request, locals }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { username } = formData;

			const isASCII = (str) => {
				// eslint-disable-next-line no-control-regex
				return new RegExp(/^[\x00-\x7F]*$/).test(str);
			};

			if (!isASCII(username) || username.includes(' '))
				return {
					success: false,
					message: 'signIn.incorrectUsername',
					type: 'usernameChange'
				};
			if (username.length < 4)
				return { success: false, message: 'signIn.usernameTooShort', type: 'usernameChange' };

			const exists = await locals.pb.collection('users').getList(1, 1, { username });
			if (exists.items.length > 0)
				return { success: false, message: 'signIn.usernameExists', type: 'usernameChange' };
			locals.user.username = username;
			await locals.pb.collection('users').update(locals.user.id, locals.user);
			return { message: 'settings.usernameChange.success', type: 'usernameChange', success: true };
		} catch (error) {
			return {
				message: Object.values(error?.response?.data ?? { error: 'settings.error' })
					.map((el) => el.message)
					.join('<br>'),
				success: false,
				text: 'raw',
				type: 'usernameChange'
			};
		}
	},
	deleteAccount: async ({ locals }) => {
		const userId = locals.user.id;

		const allVetements = await locals.pb
			.collection('items')
			.getFullList({ filter: `owner='${userId}'` });
		for await (const item of allVetements) {
			await locals.pb.collection('items').delete(item.id);
		}

		const allWorn = await locals.pb.collection('worn').getFullList();
		for await (const worn of allWorn) {
			await locals.pb.collection('worn').delete(worn.id);
		}

		const allOutfits = await locals.pb
			.collection('outfits')
			.getFullList({ filter: `owner='${userId}'` });
		for await (const outfit of allOutfits) {
			await locals.pb.collection('outfits').delete(outfit.id);
		}

		locals.pb.collection('users').delete(userId);
		locals.pb.authStore.clear();
		throw redirect(303, '/');
	},
	changeProfilePicture: async ({ request, locals }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { profilePicture } = formData;
			if (!profilePicture.size === 0)
				return {
					message: 'settings.profilePictureChange.noImage',
					type: 'profilePictureChange',
					success: false
				};

			const res = await locals.pb.collection('users').update(locals.user.id, { profilePicture });
			return {
				message: 'settings.profilePictureChange.success',
				type: 'profilePictureChange',
				success: true,
				newImage: { collectionId: res.collectionId, id: res.id, image: res.profilePicture }
			};
		} catch (error) {
			return {
				message:
					Object.values(error?.response?.data ?? '')
						.map((el) => el.message)
						.join('<br>') || 'settings.error',
				success: false,
				text: 'raw',
				type: 'profilePictureChange'
			};
		}
	},
	changeBanner: async ({ request, locals }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { banner } = formData;
			if (!banner.size === 0)
				return {
					message: 'settings.bannerChange.bioTooLong',
					type: 'bannerChange',
					success: false
				};

			const res = await locals.pb.collection('users').update(locals.user.id, { banner });
			return {
				message: 'settings.bannerChange.success',
				type: 'bannerChange',
				success: true,
				newImage: { collectionId: res.collectionId, id: res.id, image: res.banner }
			};
		} catch (error) {
			return {
				message:
					Object.values(error?.response?.data ?? '')
						.map((el) => el.message)
						.join('<br>') || 'settings.error',
				success: false,
				text: 'raw',
				type: 'bannerChange'
			};
		}
	}
};
