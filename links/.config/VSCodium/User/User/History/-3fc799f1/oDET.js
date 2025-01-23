import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDiskInfos() {
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec('lsblk -o NAME,SIZE,TYPE,FSTYPE');

		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}

		const lines = stdout.trim().split('\n');
		const disks = lines.slice(1).map((line) => {
			const parts = line.split(/\s+/);
      console.log(line, parts);
      
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
    console.log(disks.map((el) => el.fstype));

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
