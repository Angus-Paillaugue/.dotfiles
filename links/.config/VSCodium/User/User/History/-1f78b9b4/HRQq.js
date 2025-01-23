import { visit } from 'unist-util-visit';

/**
 * Transforms headings in a tree by replacing HTTP methods with styled HTML elements.
 *
 * @param {Object} tree - The tree object to be transformed.
 * @returns {Function} - A function that performs the transformation on the given tree.
 */
export function headingTransformer() {
  const httpMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'TRACE'
  ];

  const getHttpMethod = (text) =>
    httpMethods.find((method) => text.toUpperCase().startsWith(method));
  return (tree) => {
    visit(tree, 'heading', (node) => {
      for (const child of node.children) {
        const text = child.value;
        const matchingMethod = getHttpMethod(text);

        if (matchingMethod) {
          child.value = text.replace(
            matchingMethod,
            `<span class="http-keyword" data-keyword="${matchingMethod}">${matchingMethod}</span>`
          );
        }
      }
    });
  };
}

/**
 * Wraps table into a div.table-container
 *
 * @param {Object} tree - The tree object to be transformed.
 * @returns {Function} - A function that performs the transformation on the given tree.
 */
export function tableTransformer() {
  return (tree) => {
    visit(tree, 'table', (node, index, parent) => {
      const wrapper = {
        type: 'element',
        tagName: 'div',
        data: { hProperties: { className: 'table-container lenis-prevent' } },
        children: [node]
      };

      parent.children[index] = wrapper;
    });
  };
}
