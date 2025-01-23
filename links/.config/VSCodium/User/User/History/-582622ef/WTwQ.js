export const doc = [
  {
    name: 'Collapsible',
    description:
      'This component renders a collapsible section that can be toggled open or closed. It includes a summary that is always visible and a details section that can be expanded or collapsed.',
    params: [
      {
        type: 'any',
        name: 'children',
        required: true,
        description:
          'The content to be rendered inside the collapsible details section.'
      },
      {
        type: 'string',
        name: 'summary',
        required: true,
        description: 'The summary text or HTML content that is always visible.'
      },
      {
        type: 'string',
        name: 'class',
        description: 'Additional CSS classes to apply to the spinner icon.'
      },
      {
        type: 'string',
        name: 'icon',
        description: 'An optional icon to display next to the summary.'
      },
      {
        type: 'boolean',
        name: 'open',
        default: 'false',
        description: 'Whether the collapsible section is initially open.'
      },
      {
        type: 'object',
        name: 'restProps',
        description:
          'Any additional props to be spread onto the collapsible container.'
      }
    ]
  }
];
