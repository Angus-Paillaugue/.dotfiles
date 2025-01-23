export const doc = [
  {
    name: 'Button',
    description: 'This component renders a button or an anchor element based on the presence of the `href` prop. It supports various styles and types, which can be customized through props.',
    params: [
      {
        type: 'string',
        name: 'class',
        description: 'Additional CSS classes to apply to the button.'
      },
      {
        type: 'string',
        name: 'href',
        description: 'If provided, the component renders an anchor element instead of a button.'
      },
      {
        type: 'string',
        name: 'type',
        description: 'The type of button, which determines its styling.',
        acceptedValues: ['normal', 'square', 'circle', 'ghost', 'noStyle'],
        default: "'normal'"
      },
      {
        type: 'string',
        name: 'name',
        description: 'The name attribute for the button or anchor element.'
      },
      {
        type: 'any',
        name: 'children',
        description: 'The content to be rendered inside the button or anchor element.'
      }
    ]
  }

]
