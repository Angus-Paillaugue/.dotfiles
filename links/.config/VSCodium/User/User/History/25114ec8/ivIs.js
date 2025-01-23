import osusils from 'os-utils';

export const createWebsocketServer = (io) => {
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
};
