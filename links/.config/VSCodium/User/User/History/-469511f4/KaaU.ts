const server = Bun.serve({
  port: 3000,
  development: true,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on ${server.url}`);
