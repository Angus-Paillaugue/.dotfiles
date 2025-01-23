export async function load() {
  const component = await import('./HeroPreview.md');

  return {
    markdownPreview: component.default,
  };
}
