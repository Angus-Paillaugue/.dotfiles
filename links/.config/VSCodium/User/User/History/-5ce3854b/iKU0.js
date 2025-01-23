export const doc = [
  {
    name: 'Tree',
    description:
      'This component renders a tree structure, which can represent directories and files. It supports nested structures and highlights specific items based on the provided data.',
    params: [
      {
        type: 'Array',
        name: 'tree',
        description: 'The tree data to be rendered.',
        required: true
      },
      {
        type: 'string',
        name: 'tree.name',
        description: 'The name of the item.',
        required: true
      },
      {
        type: 'Array',
        name: 'tree.children',
        description: 'An array of child items, following the same structure.',
        optional: true
      },
      {
        type: 'boolean',
        name: 'tree.open',
        description: 'Whether the directory is open or closed.',
        default: 'true'
      },
      {
        type: 'boolean',
        name: 'tree.highlighted',
        description: 'Whether the item should be highlighted.'
      },
      {
        type: 'string',
        name: 'class',
        description: 'Additional CSS classes to apply to the tree container.'
      },
      {
        type: 'object',
        name: 'restProps',
        description:
          'Any additional props to be spread onto the tree container.'
      }
    ]
  }
];
