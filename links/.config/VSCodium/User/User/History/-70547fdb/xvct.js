import { siteName } from '$conf';

export async function load() {
  const component = await import('./HeroPreview.md');
  component.default.replace(/{{siteName}}/g, siteName);

  return {
    markdownPreview: component.default,
  };
}
