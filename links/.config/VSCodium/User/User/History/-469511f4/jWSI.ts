import { serve } from 'bun';

const PORT = 3000;

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    const pathRegexForID = /^\/api\/posts\/(\d+)$/;

    if (method === 'GET' && pathname === '/api/posts') {
      // handle getting all the posts
    }

    if (method === 'GET') {
      const match = pathname.match(pathRegexForID);
      const id = match && match[1];

      if (id) {
        // handle getting a post by ID
      }
    }

    if (method === 'POST' && pathname === '/api/posts') {
      // handle creating a post
    }

    if (method === 'PATCH') {
      const match = pathname.match(pathRegexForID);
      const id = match && match[1];

      if (id) {
        // handle updating a post by ID
      }
    }

    if (method === 'DELETE' && pathname === '/api/posts') {
      // handle deleting a post by ID
    }

    return new Response('Not Found', { status: 404 });

  },
});

console.log(`Listening on http://localhost:${PORT} ...`);
