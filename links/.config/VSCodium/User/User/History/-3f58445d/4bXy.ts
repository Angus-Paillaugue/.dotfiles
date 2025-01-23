import { writable } from 'svelte/store';

export const theme = writable('light');

export const toggleTheme = () => {
  theme.update((value) => (value === 'light' ? 'dark' : 'light'));
}

export const setTheme = (value: 'dark' | 'light') => {
  theme.set(value);
}

export const setSystemTheme = () => {
  theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
