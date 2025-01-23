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

export const setTheme = (value: 'dark' | 'light') => {
  theme.set(value);
  Cookies.set('theme', value);
}

export const setSystemTheme = () => {
  theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export ModeWatcher from './mode-watcher.svelte';
