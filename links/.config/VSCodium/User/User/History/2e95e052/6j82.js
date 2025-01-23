export const registry = {
  commands: {
    component: () => import(`./commands.svelte`).then((m) => m.default),
    raw: () => import(`./commands.svelte?raw`).then((m) => m.default)
  },
  tree: {
    component: () => import(`./tree.svelte`).then((m) => m.default),
    raw: () => import(`./tree.svelte?raw`).then((m) => m.default)
  }
};
