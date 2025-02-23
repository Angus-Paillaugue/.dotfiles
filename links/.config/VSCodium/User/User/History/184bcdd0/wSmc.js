/**
 * Retrieves all posts.
 * @returns {Array} An array of post objects.
 */
export function allPages() {
	let posts = [];

	const paths = import.meta.glob('/docs/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '').toLowerCase();
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const post = {
				...file.metadata,
				slug
			};
			post.published && posts.push(post);
		}
	}

	return posts;
}

/**
 * Retrieves a post by its slug.
 * @param {string} slug - The slug of the post.
 * @returns {Object} The post object.
 */
export async function postBySlug(slug) {
	const posts = allPages();
	return posts.find((post) => post.slug == slug.toLowerCase());
}

/**
 * Calculates the tolerance between two strings.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {boolean} True if the tolerance is within the maximum tolerance, false otherwise.
 */
function isMatchingSearch(str1, str2) {
	return str1.includes(str2) || str2.includes(str1);
}

/**
 * Searches for posts based on a query.
 * @param {string} query - The search query.
 * @returns {Array} An array of post objects that match the search query.
 */
export function searchPosts(query) {
	const posts = allPages();
	const searchQuery = query.toLowerCase();

	return posts.filter((post) => {
		const { title, languages, categories } = post;
		const postTitle = title.toLowerCase();

		if (languages?.includes(searchQuery) || categories?.includes(searchQuery)) return true;
		if (isMatchingSearch(postTitle, searchQuery)) return true;

		return false;
	});
}
