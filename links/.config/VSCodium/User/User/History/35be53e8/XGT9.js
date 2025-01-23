import { cards } from '$conf';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import { createConnection, getSpeedtest } from '$lib/server/db';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDbInfos(db) {
	const DEFAULT_DATABASES = ['information_schema', 'mysql', 'performance_schema', 'sys'];

	try {
		const { stdout, stderr } = await exec('systemctl status mysql');
		if (stderr) {
			console.error(`Error while getting MySQL status: ${stderr}`);
			return { status: 'Stopped', list: [], message: 'Error while getting MySQL status.' };
		}
		const activeStatusMatch = stdout.match(/Active:\s+(\w+)\s+\((\w+)\)/);

		// If the status is active, we can extract the detailed status
		if (activeStatusMatch) {
			const detailedStatus = activeStatusMatch[2];
			const databasesList = (
				await db.query(
					'SELECT table_schema AS name, ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size FROM information_schema.tables GROUP BY table_schema ORDER BY size DESC;'
				)
			)[0].filter((el) => !DEFAULT_DATABASES.includes(el.name));

			return { status: detailedStatus, list: databasesList };
		} else {
			console.error('Could not extract MySQL status from output.');
			return {
				status: 'Stopped',
				list: [],
				message: 'Could not extract MySQL status from output.'
			};
		}
	} catch (e) {
		console.error('Error while getting MySQL status:', e);
		return { status: 'Stopped', list: [], message: 'Error while getting MySQL status.' };
	}
}

async function getDiskInfos() {
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec('lsblk -o MOUNTPOINT,SIZE,FSUSED,FSUSE%,FSTYPE');

		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}

		// Split the stdout into lines
		const lines = stdout.trim().split('\n');
		const disks = lines.slice(1).map((line) => {
			const parts = line.split(/\s+/);
			return {
				['mount']: parts[0], // Source (e.g., /dev/sda1)
				['size']: parts[1], // Size (e.g., 100G)
				['used']: parts[2], // Used (e.g., 50G)
				['usage']: parts[3], // Use% (e.g., 50%)
				['type']: parts[4] // Filesystem type (e.g., ext4)
			};
		});

		const physicalDisks = disks.filter((disk) => disk.type === 'ext4');

		return physicalDisks;
	} catch (error) {
		console.error(`Execution error: ${error.message}`);
		return [];
	}
}

async function getServiceStatus(url) {
	const res = await fetch(url);
	const status = res.;
	return { status: status ? 'Running' : 'Stopped' };
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	const services = await Promise.all(
		cards.map(async (card) => {
			const urls = card.url instanceof Object ? Object.values(card.url) : [card.url];
			const status = await Promise.all(
				urls.map(async (url) => {
					const { status } = await getServiceStatus(url);
					return status;
				})
			);

			return { ...card, ...status };
		})
	);
	if(!db) {
		return { services, disks: [], databases: { status: 'Stopped', message: 'Cannot connect to your MySQL instance.', list: [] } };
	}

	const disks = await getDiskInfos();

	const databases = await getDbInfos(db);
	const speedtest = await getSpeedtest(db);

	await db.end();
	console.log(services, disks, databases, speedtest);

	return { services, disks, databases, speedtest };
}
