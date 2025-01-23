import { writable } from 'svelte/store';
import Toaster from './Toaster.svelte';

export const toasts = writable([]);

export class toast {
	static baseToastTitles = {
		green: 'Success',
		red: 'Error',
		gray: 'Info'
	};
	static #generateId = () => {
		const S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
	}

	static #newToast({
		type = 'gray',
		title = toast.baseToastTitles[type],
		message = 'Message',
		timeout = 5000
	}) {
		const newToast = {
			type,
			title,
			message,
			id: toast.#generateId(),
			timeout
		};

		// Add the new toast to the beginning of toasts the array.
		toasts.update((oldToast) => {
			oldToast.push(newToast);
			return oldToast;
		});

		// Remove the toast after the timeout.
		setTimeout(() => {
			toast.removeToast(newToast.id);
		}, newToast.timeout);
	}

	static success({ title, message, timeout }) {
		toast.#newToast({ type: 'green', title, message, timeout });
	}

	static error({ title, message, timeout }) {
		toast.#newToast({ type: 'red', title, message, timeout });
	}

	static info({ title, message, timeout }) {
		toast.#newToast({ type: 'gray', title, message, timeout });
	}

	/**
	 * Removes a toast from the toasts array based on its id.
	 * @param {number} id - The id of the toast to be removed.
	 */
	static removeToast(id) {
		toasts.update((all) => all.filter((t) => t.id !== id));
	}
}


export default Toaster;
