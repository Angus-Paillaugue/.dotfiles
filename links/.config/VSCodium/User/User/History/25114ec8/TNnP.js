import { Server } from 'socket.io';
import { osusils } from 'node-os-utils';


export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		setInterval(() => {
			const cpu = osusils.cpu.average();
			const memory = {
				free: osusils.freemem(),
				total: osusils.totalmem()
			};
			io.emit('metrics', {
				cpu,
				memory
			});
		}, 2000);

	}
};
