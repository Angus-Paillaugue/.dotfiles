import { getTree } from './pages';
import FlexSearch from 'flexsearch';

/**
 * Flattens the pages in the sidebar.
 *
 * @param {Array} sidebar - The sidebar containing the pages.
 * @returns {Array} - The flattened array of pages.
 */
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

let pages;
let postsIndex;

/**
 * Creates an index of page.
 *
 * @returns {void}
 */pagesIndex.add(i, item);
  });
}

/**
 * Searches the posts index for a given search term and returns the matching post indexes.
 *
 * @param {string} searchTerm - The search term to match against the post indexes.
 * @returns {Array} - An array of matching post indexes.
 */
export function searchPostsIndex(searchTerm) {
  // escape special regex characters
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // return matching post indexes 💪
  const results = pagesIndex.search(match);

  return (
    results
      // filter the posts based on the matched index
      .map((index) => pages[index])
      // you can do whatever you want at this point 👌
      .map(({ name, description, ...restProps }) => {
        return {
          // replace match in title with a marker
          name: replaceTextWithMarker(name, match),
          // match words in post and replace matches with marker
          description: getMatches(description, match),
          ...restProps
        };
      })
  );
}

/**
 * Retrieves the matches of a search term within a given text.
 *
 * @param {string} text - The text to search within.
 * @param {string} searchTerm - The term to search for.
 * @param {number} [limit=1] - The maximum number of matches to retrieve.
 * @returns {string[]} An array of excerpts containing the search term.
 */
function getMatches(text, searchTerm, limit = 1) {
  // create dynamic regex 😎
  const regex = new RegExp(searchTerm, 'gi');
  // word indexes
  const indexes = [];
  // matches count
  let matches = 0;
  // current match in loop
  let match;

  while ((match = regex.exec(text)) !== null && matches < limit) {
    // push that shit
    indexes.push(match.index);
    // increment matches
    matches++;
  }

  // take the word index...
  return indexes.map((index) => {
    // go back 20 characters
    const start = index - 20;
    // go forward 80 characters
    const end = index + 80;
    // yoink the text
    const excerpt = text.substring(start, end).trim();
    // return excerpt 🤝
    return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
  });
}

/**
 * Replaces all occurrences of a given match in a text with a marker.
 *
 * @param {string} text - The text to search and replace.
 * @param {string} match - The match to search for.
 * @returns {string} The text with the matches replaced by markers.
 */
function replaceTextWithMarker(text, match) {
  // create dynamic regex 😎
  const regex = new RegExp(match, 'gi');
  // preserves the text casing 🤙
  return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
