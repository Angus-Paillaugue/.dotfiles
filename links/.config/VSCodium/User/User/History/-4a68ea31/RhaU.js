/**
 * Flattens the pages in the sidebar.
 *
 * @param {Array} tree - The sidebar containing the pages.
 * @returns {Array} - The flattened array of pages.
 */
export function flattenPages(tree) {
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
  traverse(tree);
  return newPages;
}


/**
 * Converts a string into a slug by replacing spaces with hyphens.
 *
 * @param {string} path - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(path) {
  return path.replace(/ /g, '-');
}
