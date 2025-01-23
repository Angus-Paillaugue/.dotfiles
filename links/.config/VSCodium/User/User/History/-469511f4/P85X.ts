import { serve } from 'bun';

const PORT = 3000;

serve({
  port: PORT,
  async fetch(request) {
    return new Response('Hello, world!');
  },
});

console.log(`Listening on http://localhost:${PORT} ...`);
