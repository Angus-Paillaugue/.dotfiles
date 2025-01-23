import lighthouse from 'lighthouse';

const config = {
  extends: 'lighthouse:default',
}
await lighthouse('https://example.com/', { port: 9222 }, config);
