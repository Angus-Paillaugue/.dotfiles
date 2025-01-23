import { Server } from 'socket.io';
import os from 'os';


export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		setInterval(() => {
			const cpu = Math.random();
			const memory = Math.random();
			io.emit('metrics', {
				cpu,
				memory
			});
		}, 2000);

	}
};
