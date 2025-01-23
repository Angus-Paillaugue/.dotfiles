// Colors config
export const colors = {
  // The primary color used.
  // You can use https://javisperez.github.io/tailwindcolorshades/ to generate custom colors
  tailwindColors: {
    '50': '#F2F9FC',
    '100': '#E6F3FC',
    '200': '#BFDCF5',
    '300': '#9CC4F0',
    '400': '#5A8FE6',
    '500': '#1D4ED8',
    '600': '#1843C4',
    '700': '#1033A3',
    '800': '#0A2482',
    '900': '#061861',
    '950': '#030D40'
  },
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
        url: 'https://github.com/Angus-Paillaugue/Logify'
      }
    ]
  }
};

// project meta config
export const project = {
  name: 'Logify',
  description: 'Project description',
  author: 'Angus Paillaugue',
  keywords: 'svelte, sveltekit, documentation, template',
  domain: 'https://logify.paillaugue.fr'
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
    name: 'Quickstart',
    icon: {
      name: 'material-symbols:rocket-rounded',
      class: 'rotate-45'
    }
  },
  {
    name: 'Installation',
    icon: 'lucide:download',
    children: [
      {
        name: 'Using docker',
        icon: 'uil:docker'
      }
    ]
  },
  {
    name: 'Configuration',
    icon: 'lucide:settings',
    children: [
      {
        name: 'General config',
        icon: 'lucide:server'
      }
    ]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';

export const version = 'v0.0.2';
