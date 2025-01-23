import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDiskInfos() {
  const PROPERTIES = [
ALIGNMENT
ID-LINK
ID
DISC-ALN
DAX
DISC-GRAN
DISK-SEQ
DISC-MAX
DISC-ZERO
FSAVAIL
FSROOTS
FSSIZE
FSTYPE
FSUSED
FSUSE%
FSVER
GROUP
HCTL
HOTPLUG
KNAME
LABEL
LOG-SEC
MAJ:MIN
MIN-IO  minimum I/O size
MODE  device node permissions
MODEL  device identifier
MQ  device queues
NAME  device name
OPT-IO  optimal I/O size
OWNER
PARTFLAGS
PARTLABEL
PARTN
PARTTYPE  partition type code or UUID
PARTTYPENAME  partition type name
PARTUUID  partition UUID
PATH  path to the device node
PHY-SEC  physical sector size
PKNAME  internal parent kernel device name
PTTYPE  partition table type
PTUUID  partition table identifier (usually UUID)
RA  read-ahead of the device
RAND  adds randomness
REV  device revision
RM  removable device
RO  read-only device
ROTA  rotational device
RQ-SIZE  request queue size
SCHED  I/O scheduler name
SERIAL  disk serial number
SIZE  size of the device
START  partition start offset
STATE  state of the device
SUBSYSTEMS
MOUNTPOINTS
TRAN
TYPE
UUID
VENDOR
WSAME
WWN
ZONED
ZONE-SZ
ZONE-WGRAN
ZONE-APP
ZONE-NR
ZONE-OMAX
ZONE-AMAX
  ]
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec('lsblk -J -O');

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
