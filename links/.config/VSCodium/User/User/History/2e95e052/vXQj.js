export const registry = {
  'commands': {
    component: () => import(`./commands.svelte`).then((m) => m.default),
    raw: () => import(`./commands.svelte?raw`).then((m) => m.default),
  }
}
