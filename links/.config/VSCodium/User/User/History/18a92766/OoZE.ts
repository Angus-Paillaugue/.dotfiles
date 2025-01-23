import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export const pageMetadata: Writable<{
  title: string;
  description: string;
  breadcrumbs: { name: string; url?: string }[];
}> = writable({
  title: '',
  description: '',
  breadcrumbs: []
});


type ToastType = 'green' | 'red' | 'gray';
const baseToastTitles = {
  green: 'Success',
  red: 'Error',
  gray: 'Info'
};
interface Toast {
  type: ToastType;
  title: string;
  message: string;
  id: string;
}

export const toasts: Writable<Toast[]> = writable([]);
export const searchModalShown = writable(false);
export const syncKeyStore = writable({});

/**
 * Generates a unique ID by combining the current timestamp with a random number.
 * @returns {string} The generated ID.
 */
const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

export function newToast({ type, title, message }: { type: ToastType; title?: string; message: string }) {
  const newToast: Toast = {
    type: type || 'gray',
    title: title || baseToastTitles[type],
    message,
    id: generateId()
  };
  // Add the new toast to the beginning of toasts the array.
  toasts.update((oldToast) => {
    oldToast = [newToast, ...oldToast];
    return oldToast;
  });

  // Remove the toast after 5 seconds.
  setTimeout(() => {
    removeToast(newToast.id);
  }, 5000);
}

/**
 * Removes a toast from the toasts array based on its id.
 * @param {number} id - The id of the toast to be removed.
 */
export function removeToast(id: Toast['id']) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}
