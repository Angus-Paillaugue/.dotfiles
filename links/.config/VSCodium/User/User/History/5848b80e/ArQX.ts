import { writable } from 'svelte/store';

export const pageMetadata: { title: string; description: string; breadcrumbs: string[] } = writable(
  {
    title: '',
    description: '',
    breadcrumbs: []
  }
);
