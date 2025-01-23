import { writable } from 'svelte/store';

export const toasts = writable([]);

export function removeToast(id) {
  toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

const generateId = () =>
  Date.now().toString() + Math.floor(Math.random() * 10000).toString();


/**
 * Adds a new toast notification.
 *
 * @param {Object} e - The toast configuration object.
 * @param {string} [e.title='Title'] - The title of the toast.
 * @param {string} [e.message='Message contents'] - The message content of the toast.
 * @param {string} [e.type='error'] - The type of the toast. Must be one of 'error', 'success', 'warning', 'info'.
 * @param {number|boolean} [e.timeout=false] - The duration in milliseconds before the toast is automatically removed. If false, the toast will not be removed automatically.
 * @param {Object} [e.action] - An optional action object.
 * @param {string} e.action.text - The text for the action button.
 * @param {Function} e.action.callback - The callback function to be executed when the action button is clicked. The callback function will be called with the `e` argument.
 * @param {boolean} [e.closeButton=true] - Whether to show a close button on the toast.
 * @returns {Object|undefined} The newly created toast object, or undefined if there was an error.
 */
export function addToast(e) {
  const ALLOWED_TYPES = ['error', 'success', 'warning', 'info'];
  const {
    title = 'Title',
    message = 'Message contents',
    type = 'error',
    timeout = false,
    action,
    closeButton = true
  } = e || {};

  if (!ALLOWED_TYPES.includes(type)) {
    console.error(`TOAST: Invalid toast type: ${type}`);
    return;
  }
  if (typeof title !== 'string' || typeof message !== 'string') {
    console.error('TOAST: Title and message must be strings');
    return;
  }

  if (
    action &&
    (typeof action !== 'object' ||
      typeof action.text !== 'string' ||
      typeof action.callback !== 'function')
  ) {
    console.error(
      'TOAST: Action must be an object with a text and a callback property'
    );
    return;
  }
  if (typeof closeButton !== 'boolean') {
    console.error('TOAST: closeButton must be a boolean');
    return;
  }

  const newToast = {
    id: generateId(),
    title,
    message,
    type,
    hover: false,
    action,
    closeButton
  };

  toasts.update((toasts) => [...toasts, newToast]);

  if (timeout) {
    setTimeout(() => {
      removeToast(newToast.id);
    }, timeout);
  }

  return newToast;
}
