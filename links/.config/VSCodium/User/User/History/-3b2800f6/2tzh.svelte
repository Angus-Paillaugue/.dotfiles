<script>
  import { getTree } from '$lib/pages';

  const pages = flattenPages(getTree());

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

  function getNavigation() {
    const index = pages.findIndex(page => page.slug == data.slug);

    const previousPage = pages[index - 1];
    const nextPage = pages[index + 1];
    return { previousPage, nextPage };
  }

  const { previousPage, nextPage } = getNavigation();
</script>
