import { whitespace } from 'hast-util-whitespace';
import { SKIP, visit } from 'unist-util-visit';

const blockquoteTypes = {
  ':>TIP': 'tip-blockquote',
  ':>WARNING': 'warning-blockquote',
  ':>IMPORTANT': 'important-blockquote',
  ':>CAUTION': 'caution-blockquote',
  ':>NOTE': 'note-blockquote'
  // ... other types
};

const unknown = 1;
const containsImage = 2;
const containsOther = 3;
export function customBlockquotes() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent && typeof index === 'number' && applicable(node, false) === containsImage) {
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index];
      }
      const type = Object.keys(blockquoteTypes).find((key) => node.value.startsWith(key));
      if (type) {
        // Logic to transform the node
        const blockquoteType = blockquoteTypes[type];
        node.type = 'html';
        node.value = `<blockquote class="${blockquoteType}">${node.value.replace(type, '')}</blockquote>`;
        node.pa;
      }
    });
  };
}
function applicable(node, inLink) {
  /** @type {1 | 2 | 3} */
  let image = unknown;
  let index = -1;

  while (++index < node.children.length) {
    const child = node.children[index];

    if (child.type === 'text' && whitespace(child.value)) {
      // Whitespace is fine.
    } else if (child.type === 'image' || child.type === 'imageReference') {
      image = containsImage;
    } else if (!inLink && (child.type === 'link' || child.type === 'linkReference')) {
      const linkResult = applicable(child, true);

      if (linkResult === containsOther) {
        return containsOther;
      }

      if (linkResult === containsImage) {
        image = containsImage;
      }
    } else {
      return containsOther;
    }
  }

  return image;
}
