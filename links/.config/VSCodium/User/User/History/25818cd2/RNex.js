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

let posts;
let postsIndex;

export function createPagesIndex() {
  const tree = getTree();
  const pages = flattenPages(tree);
  // create the posts index
	postsIndex = new FlexSearch.Index({ tokenize: 'forward' })

	pages.forEach((post, i) => {
    // index the title and content together
    const item = `${post.title} ${post.content}`;
    // add the item to the index 👍️
    postsIndex.add(i, item);
  });

	posts = data
}


export function searchPostsIndex(searchTerm) {
  // escape special regex characters
	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // return matching post indexes 💪
	const results = postsIndex.search(match)

	return results
    // filter the posts based on the matched index
		.map((index) => posts[index])
    // you can do whatever you want at this point 👌
		.map(({ slug, title, content }) => {
			return {
				slug,
        // replace match in title with a marker
				title: replaceTextWithMarker(title, match),
        // match words in post and replace matches with marker
				content: getMatches(content, match),
			}
		})
}
