import { Server } from 'socket.io';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		setInterval(() => {
			const cpu = Math.random();
			const memory = Math.random();
			const disk = Math.random();
			const network = Math.random();
			io.emit('metrics', {
				cpu,
				memory,
				disk,
				network
			});
		}, 2000);

	}
};
