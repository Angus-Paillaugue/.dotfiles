import { pages } from '$conf';

export async function load() {
  let docsHomePage = null;

  function findFirstElement(pages, parentPath = '') {
    for (const page of pages) {
      const currentPath = parentPath ? `${parentPath}/${page.name}` : page.name;
      if (page.children && page.children.length > 0) {
        return findFirstElement(page.children, currentPath);
      } else {
        return currentPath;
      }
    }
  }

  docsHomePage = findFirstElement(pages);
  return { docsHomePage };
}
