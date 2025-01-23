import { writable } from 'svelte/store';

export const toasts = writable([]);

export function removeToast(id) {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

export function addToast() {
	const newToast = {
		id: generateId(),
		type: 'error',
		title: 'Toast title',
		message:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, voluptates? Saepe cumque quas, iusto eligendi tempora error architecto earum beatae fuga pariatur eaque sint quaerat? Reprehenderit commodi ullam quo molestiae.',
		hover: false
	};
	toasts.update((toasts) => [...toasts, newToast]);
	// setTimeout(() => {
	// 	removeToast(newToast.id);
	// }, 5000);
}
