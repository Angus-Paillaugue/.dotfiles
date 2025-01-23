// Colors config
export const colors = {
  // The primary color used.
  // You can use https://javisperez.github.io/tailwindcolorshades/ to generate custom colors
  // For a list of available themes, visit https://shiki.matsu.io/themes
  codeBlockThemes: {
    light: 'github-light',
    dark: 'github-dark-dimmed'
  }
};

// Sidebar config
export const sideBar = {
  style: 'details', // "static"|"details" (default: "details")
  develop: true, // true|false (default: true), Only works with sidebarStyle "details"
  socials: {
    target: '_blank', // _blank|_self|_parent|_top|framename
    list: [
      {
        name: 'GitHub',
        icon: 'line-md:github-loop',
        url: 'https://github.com/Angus-Paillaugue/SvelteShine'
      }
    ]
  }
};

// project meta config
export const project = {
  name: 'Project name',
  description: 'Project description',
  author: 'Angus Paillaugue',
  keywords: 'svelte, sveltekit, documentation, template',
  domain: 'https://svelte-shine.paillaugue.fr'
};

// Homepage config
export const homepage = {
  catchphrase: 'Illuminate your Svelte documentation'
};

// All of your docs pages
// You can add, sort, and nest pages here
// The name is the text that will appear in the sidebar
// If you add a markdown page but don't add it here, it won't appear in the sidebar
export const pages = [
  {
    name: 'Components',
    children: [
      {
        name: 'Toast'
      },
      {
        name: 'Button'
      }
    ]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';

export const version = 'v0.0.2';
