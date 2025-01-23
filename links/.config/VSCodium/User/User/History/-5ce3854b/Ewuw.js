/**
 * @name Tree
 *
 * This component renders a tree structure, which can represent directories and files.
 * It supports nested structures and highlights specific items based on the provided data.
 *
 * @param {Array} tree - The tree data to be rendered.
 * @param {string} [tree.name] - The name of the item.
 * @param {Array} [tree.children] - An array of child items, following the same structure.
 * @param {boolean} [tree.open=true] - Whether the directory is open or closed.
 * @param {boolean} [tree.highlighted=false] - Whether the item should be highlighted.
 * @param {boolean} [root=true] - Indicates if this is the root of the tree.
 * @param {string} [class] - Additional CSS classes to apply to the tree container.
 * @param {object} [restProps] - Any additional props to be spread onto the tree container.
 */
