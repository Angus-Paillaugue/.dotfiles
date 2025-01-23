import { pages } from '$conf';
import { slugify } from './utils';

const docsUrlStart = '/docs';

export interface Page {
  name: string;
  description: string;
  component: any;
  icon: string;
  url: string;
  lastModified: string;
  slug?: string;
  filePath?: string;
}

export interface NestedPage extends Page {
  children?: Page[];
}

export function getTree(): NestedPage[]  {
  const docs = import.meta.glob('/docs/**/*', { eager: true });
  const updatedPages = JSON.parse(JSON.stringify(pages));

  // Internal recursive function to traverse and add metadata
  function traverseAndAddMetadata(pages: NestedPage[], baseUrl = ''): NestedPage[] {
    return pages.map((page) => {
      if (page.children) {
        // If the page has children, recursively add metadata to the children
        const updatedChildren = traverseAndAddMetadata(page.children, baseUrl + '/' + page.name);
        return { ...page, children: updatedChildren };
      } else {
        // Add metadata to the page

        const docKey = Object.keys(docs)
          .map((el) => {
            const filename = el.split('/').pop().split('.')[0];
            if (filename == page.name) return el;
          })
          .filter((el) => el);
        const metadata = docs[docKey] || {};
        const pageUrl = slugify(baseUrl + '/' + page.name);
        const slug = slugify(pageUrl.replace(docsUrlStart + '/', ''));
        return {
          ...page,
          ...metadata.metadata,
          filePath: docKey,
          component: metadata.default,
          url: pageUrl,
          slug,
          filePath: docKey,
        };
      }
    });
  }

  return traverseAndAddMetadata(updatedPages, docsUrlStart);
}

export function pageBySlug(slug: string): Page | null {
  const pages = getTree();

  function findPageBySlug(pages: NestedPage[], slug: string): Page | null {
    for (const page of pages) {
      if (page.slug === slug) return page;
      if (page.children) {
        const found = findPageBySlug(page.children, slug);
        if (found) return found;
      }
    };

    return null;
  }
  return findPageBySlug(pages, slug);
}

export function getTreeWithFileContents() {
  const pages = getTree();
  const updatedPages = pages.map((page) => {
    if (page.filePath) {
      const content = import.meta.glob(page.filePath, {
        eager: true,
        query: '?raw',
        import: 'default'
      })[page.filePath];
      return { ...page, content: content.default };
    }
    return page;
  });
  return updatedPages;
}
