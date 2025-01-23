import { writable } from 'svelte/store';

export const toasts = writable([]);

export function removeToast(id) {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

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

	if (action && (typeof action !== 'object' || typeof action.text !== 'string' || typeof action.callback !== 'function')) {
		console.error('TOAST: Action must be an object with a text and a callback property');
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
