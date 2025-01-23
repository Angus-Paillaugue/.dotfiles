/**
 * @name Tree
 *
 * This component renders a tree structure, which can represent directories and files.
 * It supports nested structures and highlights specific items based on the provided data.
 *
 * @param {Array} tree - The tree data to be rendered. Each item in the array can be an object with the following structure
 *   - {string} name - The name of the item.
 *   - {Array} [children] - An array of child items, following the same structure.
 *   - {boolean} [open=true] - Whether the directory is open or closed.
 *   - {boolean} [highlighted] - Whether the item should be highlighted.
 * @param {boolean} [root=true] - Indicates if this is the root of the tree.
 * @param {string} [class] - Additional CSS classes to apply to the tree container.
 * @param {object} [restProps] - Any additional props to be spread onto the tree container.
 *
 * Example usage:
 * <Tree
 *   tree={[
 *     { name: 'Folder 1', children: [{ name: 'File 1-1' }, { name: 'File 1-2', highlighted: true }] },
 *     { name: 'Folder 2', children: [{ name: 'File 2-1' }] },
 *     { name: 'File 3', highlighted: true }
 *   ]}
 *   class="my-custom-tree"
 * />
 */
