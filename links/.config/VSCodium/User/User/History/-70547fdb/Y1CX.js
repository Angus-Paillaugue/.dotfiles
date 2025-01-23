export async function load() {
  const SvelteComponents = await import('./SvelteComponents.md');

  return {
    markdownPreview: {
      SvelteComponents: SvelteComponents.default
    }
  };
}
