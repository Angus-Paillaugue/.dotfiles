export const Index = {
  test: {
    name: 'test',
    component: () => import('./lib/components/test.svelte').then((m) => m.default),
    files: ['./lib/components/test.svelte'],
    raw: () =>
      import('./lib/components/test.svelte?raw').then((m) => m.default)
  }
};
