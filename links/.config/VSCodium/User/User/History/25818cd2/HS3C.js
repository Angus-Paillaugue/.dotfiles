import { getTree } from "./pages"

export function createPagesIndex() {
  const tree = getTree();
  // create the posts index
	postsIndex = new FlexSearch.Index({ tokenize: 'forward' })

	data.forEach((post, i) => {
    // index the title and content together
		const item = `${post.title} ${post.content}`
    // add the item to the index 👍️
		postsIndex.add(i, item)
	})

	posts = data
}
