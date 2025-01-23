import { Server } from 'socket.io';
import osusils from 'os-utils';

const POLL_INTERVAL = 2000;


export const createWebsocketServer = (server) => {
	if (!server.httpServer) return;

	const io = new Server(server.httpServer);

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
	}, POLL_INTERVAL);
}
