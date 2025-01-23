import lighthouse from 'lighthouse';

const config = {
  extends: 'lighthouse:default',
}
await lighthouse('http://localhost', { port: 5173 }, config);
