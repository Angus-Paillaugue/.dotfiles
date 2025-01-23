import { writable } from 'svelte/store';

export const theme = writable('light');

export const toggleTheme = () => {
  theme.update((value) => (value === 'light' ? 'dark' : 'light'));
}

export const modeWatcher = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  theme.set(mediaQuery.matches ? 'dark' : 'light');

  mediaQuery.addEventListener('change', (event) => {
    theme.set(event.matches ? 'dark' : 'light');
  });
}

export const setTheme = (value: 'dark' | 'light') => {
  theme.set(value);
}
