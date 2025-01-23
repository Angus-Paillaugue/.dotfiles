import { pages } from '$conf';

export async function load() {
  let docsHomePage = null;

  function findFirstElement(pages) {
    for (const page of pages) {
      if (page.children && page.children.length > 0) {
        return findFirstElement(page.children);
      } else {
        return page;
      }
    }
  }

  docsHomePage = findFirstElement(pages);
  return { docsHomePage };
}
