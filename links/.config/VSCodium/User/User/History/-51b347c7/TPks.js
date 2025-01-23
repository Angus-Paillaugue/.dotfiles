import express from 'express';
import { createServer } from 'http';
import { createWebsocketServer } from '../websocket.js';
import { handler } from '../build/handler.js';

const port = 8090;
const app = express();
const server = createServer(app);

createWebsocketServer(server);

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port);
