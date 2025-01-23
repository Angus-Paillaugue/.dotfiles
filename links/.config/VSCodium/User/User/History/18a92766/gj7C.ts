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


type ToastType = 'success' | 'error' | 'info';
interface ToastOptions {
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Toast {
  type: ToastType;
  message: string;
  id: string;
  options: ToastOptions;
}
export const toasts: Writable<Toast[]> = writable([]);

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

function newToast(type: ToastType, message: string, options: ToastOptions): string {
  const newToast: Toast = {
    type: type,
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

  return 
}

function removeToast(id: Toast['id']) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}

export class toast {
  static success(message: string, options: ToastOptions = {}): string {
    return newToast('success', message, options);
  }

  static error(message: string, options: ToastOptions = {}): string {
    return newToast('error', message, options);
  }

  static info(message: string, options: ToastOptions = {}): string {
    return newToast('info', message, options);
  }

  remove(id: string) {
    removeToast(id);
  }
}
