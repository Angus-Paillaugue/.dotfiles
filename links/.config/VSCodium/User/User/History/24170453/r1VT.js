import { writable } from 'svelte/store';
import Toaster from './Toaster.svelte';

export const toasts = writable([
]);

export class toast {
	static baseToastTitles = {
		success: 'Success',
		error: 'Error',
		warning: 'Warning',
		info: 'Info'
	};


	/**
	 * Generates a unique identifier string based on the current timestamp and a random number.
	 * @returns {string} A unique identifier string.
	 */
	static #generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

	/**
	 * Creates a new toast notification and adds it to the toasts array.
	 * The toast will be removed after the specified timeout.
	 *
	 * @param {Object} options - The options for the new toast.
	 * @param {string} [options.type='info'] - The type of the toast (e.g., 'info', 'success', 'error').
	 * @param {string} [options.title=toast.baseToastTitles[type]] - The title of the toast.
	 * @param {string} [options.message='Message'] - The message of the toast.
	 * @param {number} [options.timeout=5000] - The duration in milliseconds before the toast is removed.
	 * @private
	 */
	static #newToast({
		type = 'info',
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
		if (!newToast.timeout) return;
		setTimeout(() => {
			toast.removeToast(newToast.id);
		}, newToast.timeout);
	}

	static success({ title, message, timeout }) {
		toast.#newToast({ type: 'success', title, message, timeout });
	}

	static error({ title, message, timeout }) {
		toast.#newToast({ type: 'error', title, message, timeout });
	}

	static warning({ title, message, timeout }) {
		toast.#newToast({ type: 'warning', title, message, timeout });
	}

	static info({ title, message, timeout }) {
		toast.#newToast({ type: 'info', title, message, timeout });
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
