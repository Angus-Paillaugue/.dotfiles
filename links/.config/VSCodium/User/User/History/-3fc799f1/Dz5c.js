import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDiskInfos() {
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec(`lsblk -J -M -A -a `);

		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}
		const disks = JSON.parse(stdout)?.blockdevices;
    for(const disk of disks) {
      if(disk.children) {
        for(const child of disk.children) {
          disks.push(child);
        }
      }
    }

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

	return { disks  };
}
