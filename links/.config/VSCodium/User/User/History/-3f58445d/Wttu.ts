import { get, writable } from 'svelte/store';
import Cookies from 'js-cookie';

export const theme = writable('light');

export const toggleTheme = () => {
  if (get(theme) === 'light') {
    setTheme('dark');
  }else {
    setTheme('light');
  }
}

export const getTheme = () => {
  return get(theme);
}

export const setTheme = (value: 'dark' | 'light') => {
  theme.set(value);
  Cookies.set('theme', value);
}

export const setDefaultTheme = () => {
  theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
import ModeWatcher from './mode-watcher.svelte';
export { ModeWatcher };
