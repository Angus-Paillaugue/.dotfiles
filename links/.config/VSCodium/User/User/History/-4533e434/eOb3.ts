import { writable } from 'svelte/store';

export const draggedItemId = writable<string | null>(null);
