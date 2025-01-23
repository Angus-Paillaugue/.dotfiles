import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use it with async/await
const exec = promisify(execCallback);

async function getDiskInfos() {
  const PROPERTIES = {
    'ALIGNMENT': 'alignment offset',
    'ID-LINK': 'the shortest udev /dev/disk/by-id link name',
    'ID': 'udev ID (based on ID-LINK)',
    'DISC-ALN': 'discard alignment offset',
    'DAX': 'dax-capable device',
    'DISC-GRAN': 'discard granularity',
    'DISK-SEQ': 'disk sequence number',
    'DISC-MAX': 'discard max bytes',
    'DISC-ZERO': 'discard zeroes data',
    'FSAVAIL': 'filesystem size available',
    'FSROOTS': 'mounted filesystem roots',
    'FSSIZE': 'filesystem size',
    'FSTYPE': 'filesystem type',
    'FSUSED': 'filesystem size used',
    'FSUSE%': 'filesystem use percentage',
    'FSVER': 'filesystem version',
    'GROUP': 'group name',
    'HCTL': 'Host:Channel:Target:Lun for SCSI',
    'HOTPLUG': 'removable or hotplug device (usb, pcmcia, ...)',
    'KNAME': 'internal kernel device name',
    'LABEL': 'filesystem LABEL',
    'LOG-SEC': 'logical sector size',
    'MAJ:MIN': 'major:minor device number',
    'MIN-IO': 'minimum I/O size',
    'MODE': 'device node permissions',
    'MODEL': 'device identifier',
    'MQ': 'device queues',
    'NAME': 'device name',
    'OPT-IO': 'optimal I/O size',
    'OWNER': 'user name',
    'PARTFLAGS': 'partition flags',
    'PARTLABEL': 'partition LABEL',
    'PARTN': 'partition number as read from the partition table',
    'PARTTYPE': 'partition type code or UUID',
    'PARTTYPENAME': 'partition type name',
    'PARTUUID': 'partition UUID',
    'PATH': 'path to the device node',
    'PHY-SEC': 'physical sector size',
    'PKNAME': 'internal parent kernel device name',
    'PTTYPE': 'partition table type',
    'PTUUID': 'partition table identifier (usually UUID)',
    'RA': 'read-ahead of the device',
    'RAND': 'adds randomness',
    'REV': 'device revision',
    'RM': 'removable device',
    'RO': 'read-only device',
    'ROTA': 'rotational device',
    'RQ-SIZE': 'request queue size',
    'SCHED': 'I/O scheduler name',
    'SERIAL': 'disk serial number',
    'SIZE': 'size of the device',
    'START': 'partition start offset',
    'STATE': 'state of the device',
    'SUBSYSTEMS': 'de-duplicated chain of subsystems',
    'MOUNTPOINT': 'where the device is mounted',
    'MOUNTPOINTS': 'all locations where device is mounted',
    'TRAN': 'device transport type',
    'TYPE': 'device type',
    'UUID': 'filesystem UUID',
    'VENDOR': 'device vendor',
    'WSAME': 'write same max bytes',
    'WWN': 'unique storage identifier',
    'ZONED': 'zone model',
    'ZONE-SZ': 'zone size',
    'ZONE-WGRAN': 'zone write granularity',
    'ZONE-APP': 'zone append max bytes',
    'ZONE-NR': 'number of zones',
    'ZONE-OMAX': 'maximum number of open zones',
    'ZONE-AMAX': 'maximum number of active zones',
  }
	try {
		// Execute 'lsblk' to list block devices with relevant information
		const { stdout, stderr } = await exec(`lsblk -o ${Object.keys(PROPERTIES).join(',')}`);

		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}

		const lines = stdout.trim().split('\n');
		const disks = lines.slice(1).map((line) => {
			const parts = line.split(/\s+/);
      console.log(parts);
      

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
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const disks = await getDiskInfos();
  console.log(disks);

	return { disks  };
}
