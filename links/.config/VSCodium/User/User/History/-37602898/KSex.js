import lighthouse from 'lighthouse';

const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance'],
  },
}
await lighthouse('https://example.com/', { port: 9222 }, config);
