import { writable } from 'svelte/store';
import Toaster from './Toaster.svelte';

export const toasts = writable([]);

export class toast {
  static baseToastTitles = {
    green: 'Success',
    red: 'Error',
    gray: 'Info'
  };
	#generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

	#newToast({ type = 'gray', title = toast.baseToastTitles[type], message = 'Message', timeout = 5000 }) {
		const newToast = {
			type,
			title,
			message,
			id: this.#generateId(),
			timeout
		};
		// Add the new toast to the beginning of toasts the array.
		toasts.update((oldToast) => {
			oldToast.push(newToast);
			return oldToast;
		});

		// Remove the toast after 5 seconds.
		setTimeout(() => {
			this.removeToast(newToast.id);
		}, newToast.timeout);
	}


	success() {
    this.#newToast({ type: 'green', title: 'Success', message: 'Message' });
  }

  error() {
    this.#newToast({ type: 'red', title: 'Error', message: 'Message' });
  }

  info() {
    this.#newToast({ type: 'gray', title: 'Info', message: 'Message' });
  }

	/**
	 * Removes a toast from the toasts array based on its id.
	 * @param {number} id - The id of the toast to be removed.
	 */
	removeToast(id) {
		toasts.update((all) => all.filter((t) => t.id !== id));
	}
}


export default Toaster;
