export const Index = {
  tree: {
    name: 'tree',
    component: () => import('./Demos/tree.svelte').then((m) => m.default),
    raw: () => import('./Demos/tree.svelte?raw').then((m) => m.default)
  }
};
