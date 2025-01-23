import { SKIP, visit } from 'unist-util-visit';

const blockquoteTypes = {
  ':>TIP': 'tip-blockquote',
  ':>WARNING': 'warning-blockquote',
  ':>IMPORTANT': 'important-blockquote',
  ':>CAUTION': 'caution-blockquote',
  ':>NOTE': 'note-blockquote'
  // ... other types
};

export function customBlockquotes() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent && typeof index === 'number' && typeof node.children === Array) {
        parent.children.splice(index, 1, ..);
        const type = Object.keys(blockquoteTypes).find((key) => node.value.startsWith(key));
        if (type) {
          // Logic to transform the node
          const blockquoteType = blockquoteTypes[type];
          node.type = 'html';
          node.value = `<blockquote class="${blockquoteType}">${node.value.replace(type, '')}</blockquote>`;
        }
        return [SKIP, index];
      }
    });
  };
}
