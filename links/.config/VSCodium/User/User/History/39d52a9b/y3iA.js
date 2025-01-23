import { visit } from 'unist-util-visit';

export function imageTransformer() {
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      let src = node.url;
      const alt = node.alt;
      const caption = props['data-caption'];

      let newNode = null;
      if (caption) {
        newNode = {
          type: 'html',
          value: `
            <figure role="figure" alt="${alt}">
              <img src=${src} alt="${alt}" class="page-image" />
              <figcaption>${caption}</figcaption>
            </figure>
          `
        };
      } else {
        newNode = {
          type: 'html',
          value: `<img src=${src} class="page-image" alt="${alt}" />`
        };
      }

      Object.assign(parent, newNode);
    });
  };
}

export function linkTransformer() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      props.class = 'link';
      if (node.url.startsWith('http')) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
        
      }
    });
  };
}
