import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import osusils from 'os-utils';

import { handler } from '../build/handler.js';

const port = 8090;
const app = express();
const server = createServer(app);

const io = new Server(server);

setInterval(() => {
	osusils.cpuUsage((cpu) => {
		const memory = {
			free: osusils.freemem(),
			total: osusils.totalmem()
		};
		io.emit('metrics', {
			cpu,
			memory
		});
	});
}, 2000);

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port);
