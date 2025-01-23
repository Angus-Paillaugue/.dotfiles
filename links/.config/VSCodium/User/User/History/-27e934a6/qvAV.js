import { writable } from 'svelte/store';

export const toasts = writable([]);

export function removeToast(id) {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

export function addToast(e) {
  const { title = "Title", message = "Message contents", type = 'danger', timeout = false } = e || {};
	const newToast = {
		id: generateId(),
    title,
    message,
    type,
		hover: false
	};

	toasts.update((toasts) => [...toasts, newToast]);

  if (timeout) {
    setTimeout(() => {
      removeToast(newToast.id);
    }, timeout);
  }
}
