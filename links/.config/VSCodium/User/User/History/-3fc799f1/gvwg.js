import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDiskInfos() {
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec('lsblk -J -o NAME,SIZE,TYPE,FSTYPE');

		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}

		// Split the stdout into lines
		const disks = JSON.parse(stdout)?.blockdevices;
    console.log(stdout);

		const physicalDisks = disks.filter((disk) => disk.fstype === 'ext4');

		return physicalDisks;
	} catch (error) {
		console.error(`Execution error: ${error.message}`);
		return [];
	}
}
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const disks = await getDiskInfos();
  console.log(disks);

	return { disks  };
}
