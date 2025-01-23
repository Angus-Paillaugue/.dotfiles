export const tailwindColors = {
  // 50: 'rgb(250 250 250)',
  // 100: 'rgb(245 245 245)',
  // 200: 'rgb(229 229 229)',
  // 300: 'rgb(212 212 212)',
  // 400: 'rgb(163 163 163)',
  // 500: 'rgb(115 115 115)',
  // 600: 'rgb(82 82 82)',
  // 700: 'rgb(64 64 64)',
  // 800: 'rgb(38 38 38)',
  // 900: 'rgb(23 23 23)',
  // 950: 'rgb(10 10 10)'
  50: 'rgb(255, 249, 237)',
  100: 'rgb(254, 242, 214)',
  200: 'rgb(252, 224, 172)',
  300: 'rgb(249, 201, 120)',
  400: 'rgb(247, 177, 85)',
  500: 'rgb(243, 141, 28)',
  600: 'rgb(228, 115, 18)',
  700: 'rgb(189, 87, 17)',
  800: 'rgb(150, 69, 22)',
  900: 'rgb(121, 58, 21)',
  950: 'rgb(65, 28, 9)'
};

// For a list of available themes, visit https://shiki.matsu.io/themes
// You may also have to change the variable in the src/code.css 8:14
export const codeBlockTheme = 'one-dark-pro';

// Socials in the navbar
export const socials = {
  GitHub: 'https://github.com/Angus-Paillaugue'
};

// Site meta config
export const siteName = 'Doc-template';
export const siteDescription = 'A simple documentation template for SvelteKit';
export const siteAuthor = 'Angus Paillaugue';
export const keywords = 'svelte, sveltekit, documentation, template';

// All of your docs pages
// You can add, sort, and nest pages here
// The name is the text that will appear in the sidebar
// If you add a markdown page but don't add it here, it won't appear in the sidebar
export const pages = [
  {
    name: 'Home'
  },
  {
    name: 'Pages',
    children: [
      {
        name: 'Create a page'
      },
      {
        name: 'Code blocks'
      }
    ]
  },
  {
    name: 'Configuration',
    children: [{ name: 'Colors' }]
  },
  {
    name: 'Directories',
    children: [{ name: 'Sort Directories' }]
  },
  {
    name: 'Components',
    children: [{ name: 'Commands' }, { name: 'Tooltip' }, { name: 'Tree' }, { name: 'Definition' }]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';
