import { cards } from '$conf';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import { createConnection, getSpeedtest } from '$lib/server/db';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDbInfos(db) {
	// const DEFAULT_DATABASES = ['information_schema', 'mysql', 'performance_schema', 'sys'];

	try {
		const databasesList = (
			await db.query(`
				SELECT
					table_schema AS name,
					ENGINE,
					ROW_FORMAT,
					SUM(TABLE_ROWS) AS TABLE_ROWS,
					AVG(AVG_ROW_LENGTH) AS AVG_ROW_LENGTH,
					SUM(DATA_LENGTH) AS DATA_LENGTH,
					SUM(INDEX_LENGTH) AS INDEX_LENGTH,
					MAX(AUTO_INCREMENT) AS AUTO_INCREMENT,
					MIN(CREATE_TIME) AS CREATE_TIME,
					MAX(UPDATE_TIME) AS UPDATE_TIME,
					ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size
				FROM
					information_schema.tables
				GROUP BY table_schema, ENGINE, ROW_FORMAT
				ORDER BY name DESC;
			`)
		)[0];

		return { isUp: true, list: databasesList };
	} catch (e) {
		console.error('Error while getting MySQL status:', e);
		return { isUp: false, list: [], message: 'Error while getting MySQL status.' };
	}
}
async function getDiskInfos() {
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec('lsblk -o MOUNTPOINT,SIZE,FSUSED,FSUSE%,FSTYPE,FSAVAIL');

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
				['type']: parts[4], // Filesystem type (e.g., ext4)
				['available']: parts[5] // Available (e.g., 50G)
			};
		});

		const physicalDisks = disks.filter((disk) => disk.type === 'ext4');

		return physicalDisks;
	} catch (error) {
		console.error(`Execution error: ${error.message}`);
		return [];
	}
}

async function getServiceStatus(port) {
	try {
		const { stdout } = await exec(`sudo ss -lptn 'sport = :${port}'`);
		return { isUp: stdout.includes(`:${port}`) };
	} catch (_) {
		return { isUp: false };
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	const services = await Promise.all(
		cards.map(async (card) => {
			const port = card.port || 80;
			const status = await getServiceStatus(port);

			return { ...card, ...status };
		})
	);
	const disks = await getDiskInfos();
	if (!db) {
		return {
			services,
			disks,
			databases: { isUp: false, message: 'Cannot connect to your MySQL instance.', list: [] }
		};
	}

	const databases = await getDbInfos(db);
	const speedtest = await getSpeedtest(db);

	await db.end();

	return { services, disks, databases, speedtest };
}
