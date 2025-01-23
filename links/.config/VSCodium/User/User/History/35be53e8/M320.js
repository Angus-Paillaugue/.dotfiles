import { cards } from '$conf';
import ip from 'ip';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const services = cards.map(el => elel.running = "Running");

	const disks = [
		{ usage: 70, size: '256GB' },
		{ usage: 20, size: '1.8TB' }
	];

	const databases = [
		{ name: 'Mysql', status: 'Out', size: '12Mb' },
		{ name: 'PostgreSQL', status: 'Running', size: '7Mb' }
	];

	return { services, disks, databases, ip: ip.address() };
}
