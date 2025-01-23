export const doc = [
  {
    name: 'Tooltip',
    description:
      "This component renders a tooltip that appears when the user hovers over, focuses on, or interacts with the target element. The tooltip's position and appearance can be customized through props.",
    params: [
      {
        type: 'string',
        name: 'title',
        description: 'The text content of the tooltip.',
        required: true
      },
      {
        type: 'string',
        name: 'position',
        description:
          'The position of the tooltip relative to the target element.',
        acceptedValues: ['top', 'right', 'bottom', 'left'],
        default: "'top'"
      },
      {
        type: 'string',
        name: 'class',
        description: 'Additional CSS classes to apply to the tooltip.'
      },
      {
        type: 'any',
        name: 'children',
        description: 'The content to be rendered inside the target element.'
      },
      {
        type: 'object',
        name: 'restProps',
        description:
          'Any additional props to be spread onto the target element.'
      }
    ]
  }
];
