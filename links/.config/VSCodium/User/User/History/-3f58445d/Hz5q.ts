import { get, writable } from 'svelte/store';
import Cookies from 'js-cookie';

export type Themes = 'light' | 'dark';

export const toggleTheme = () => {
  if (get(theme) === 'light') {
    setTheme('dark');
  }else {
    setTheme('light');
  }
}

export const getTheme = () => {
  if(Cookies.get('theme') === undefined) {
    setDefaultTheme();
  }

  return Cookies.get('theme');
}

export const setTheme = (value: Themes) => {
  theme.set(value);
  Cookies.set('theme', value);
};

export const setDefaultTheme = () => {
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export const theme = writable<Themes>('light');


import ModeWatcher from './mode-watcher.svelte';
export { ModeWatcher };
