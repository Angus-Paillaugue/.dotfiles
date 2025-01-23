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
interface ToastOptions {
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Toast {
  type: ToastType;
  title: string;
  message: string;
  id: string;
  options: ToastOptions;
}
export const toasts: Writable<Toast[]> = writable([]);

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

function newToast(type: ToastType, message: string, options: ToastOptions) {
  const newToast: Toast = {
    type: type || 'gray',
    message,
    id: generateId(),
    options
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
  static success(message: string, options: ToastOptions = {}) {
    newToast({ type: 'green', message, options });
  }

  static error(message: string, options: ToastOptions = {}) {
    newToast({ type: 'red', message, options });
  }

  static info(message: string, options: ToastOptions = {}) {
    newToast({ type: 'gray', message, options });
  }

  remove(id: string) {
    removeToast(id);
  }
}
