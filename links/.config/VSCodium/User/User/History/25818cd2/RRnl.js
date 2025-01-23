import { getTree } from "./pages";
import FlexSearch from 'flexsearch';

function flattenPages(sidebar) {
  let newPages = [];
  function traverse(items) {
    for (const item of items) {
      if (item.url) {
        newPages.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }
  traverse(sidebar);
  return newPages;
}

export function createPagesIndex() {
  const tree = getTree();
  const pages = flattenPages(tree);
  // create the posts index
	const postsIndex = new FlexSearch.Index({ tokenize: 'forward' })

	pages.forEach((post, i) => {
    // index the title and content together
    const item = `${post.title} ${post.content}`;
    // add the item to the index 👍️
    postsIndex.add(i, item);
  });

	posts = data
}
