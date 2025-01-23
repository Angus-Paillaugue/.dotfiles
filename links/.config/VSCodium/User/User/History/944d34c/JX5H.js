export const Index = {
  test: {
    name: 'test',
    component: () => import('./components/test.svelte').then((m) => m.default),
    files: ['./components/test.svelte'],
    raw: () =>
      import('./components/test.svelte?raw').then((m) => m.default)
  }
};
