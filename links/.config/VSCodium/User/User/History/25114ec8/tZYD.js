import { Server } from 'socket.io';
import { osusils } from 'os-utils';


export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		setInterval(() => {
			const cpu = os.cpus();
			const memory = {
				free: os.freemem(),
				total: os.totalmem()
			};
			io.emit('metrics', {
				cpu,
				memory
			});
		}, 2000);

	}
};
