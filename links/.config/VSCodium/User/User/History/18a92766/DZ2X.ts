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

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

function newToast({
  type,
  title,
  message
}: {
  type: ToastType;
  title?: string;
  message: string;
}) {
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

function removeToast(id: Toast['id']) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}

export class toast {
  static success(message: string, title?: string) {
    newToast({ type: 'green', title, message });
  }

  static error(message: string, title?: string) {
    newToast({ type: 'red', title, message });
  }

  static info(message: string, title?: string) {
    newToast({ type: 'gray', title, message });
  }

  remove(id: string) {
    removeToast(id);
  }
}
