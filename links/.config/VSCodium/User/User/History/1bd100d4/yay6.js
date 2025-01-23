export const doc = [
  {
    name: 'removeToast',
    description: 'Removes a toast notification by its ID.',
    params: [
      {
        type: 'string',
        name: 'id',
        description: 'The unique identifier of the toast to be removed.',
        required: true
      }
    ]
  },
  {
    name: 'addToast',
    description: 'Adds a new toast notification.',
    params: [
      {
        type: 'Object',
        name: 'e',
        description: 'The toast configuration object.',
      },
      {
        type: 'string',
        name: 'e.title',
        description: 'The title of the toast.',
        default: "'Title'"
      },
      {
        type: 'string',
        name: 'e.message',
        description: 'The message content of the toast.',
        default: "'Message contents'"
      },
      {
        type: 'string',
        name: 'e.type',
        description: 'The type of the toast',
        default: "'error'",
        acceptedValues: ['error', 'success', 'warning', 'info']
      },
      {
        type: 'number|boolean',
        name: 'e.timeout',
        description: 'The duration in milliseconds before the toast is automatically removed. If false, the toast will not be removed automatically.',
        default: 'false'
      },
      {
        type: 'Object',
        name: 'e.action',
        description: 'An optional action object.'
      },
      {
        type: 'string',
        name: 'e.action.text',
        description: 'The text for the action button.'
      },
      {
        type: 'Function',
        name: 'e.action.callback',
        description: 'The callback function to be executed when the action button is clicked. The callback function will be called with the `e` argument.'
      },
      {
        type: 'boolean',
        name: 'e.closeButton',
        description: 'Whether to show a close button on the toast.',
        default: 'true'
      }
    ],
  },
  {
    name: 'Toaster',
    description: 'The Toaster component is used to display a list of toasts. Put it into your root-most layout',
    example: '<Toaster />'
  }
]
