import { Server } from 'socket.io';
import osusils from 'os-utils';


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
	}, 2000);
}
