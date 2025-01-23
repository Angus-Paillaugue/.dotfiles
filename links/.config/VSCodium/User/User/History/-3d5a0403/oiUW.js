import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkRelease(release) {
  if(!release.version) {
    throw new Error('Version is required');
  }
  if (!release.description) {
    throw new Error('A description is required');
  }
}

function isNewerVersion(lastVersion, newVersion) {
  const lastParts = lastVersion.split('.').map(Number);
  const newParts = newVersion.split('.').map(Number);

  for (let i = 0; i < lastParts.length; i++) {
    if (newParts[i] > lastParts[i]) {
      return true;
    } else if (newParts[i] < lastParts[i]) {
      return false;
    }
  }

  return false; // if all parts are equal, the newVersion is not greater
}

function createNewRelease(release) {
  checkRelease(release);

  if (!release.date) {
    release.date = new Date().toISOString();
  }
  const changeLogFilePath = path.resolve(__dirname, '../src/routes/releases/releases.json');
  const changeLogFile = JSON.parse(readFileSync(changeLogFilePath, 'utf-8'));
  const lastVersion = changeLogFile.at(-1);

  if (!isNewerVersion(lastVersion.version, release.version)) {
    throw new Error('New version must be greater than the last one');
  }

  changeLogFile.push(release);

  writeFileSync(changeLogFilePath, JSON.stringify(changeLogFile, null, 2));
}

(async() => {
  const release = await inquirer.prompt([
    // {
    //   type: 'input',
    //   name: 'version',
    //   message: 'Version',
    //   validate: (input) => {
    //     if (!input) {
    //       return 'A version is required';
    //     }
    //     if (!/^v\d+\.\d+\.\d+$/.test(input)) {
    //       return 'Version must be in the format vx.x.x';
    //     }
    //     return true;
    //   }
    // },
    // {
    //   type: 'input',
    //   name: 'description',
    //   message: 'Description',
    //   validate: (input) => {
    //     if (!input) {
    //       return 'A description is required';
    //     }
    //     return true;
    //   }
    // },
    {
      type: 'input',
      name: 'date',
      message: 'Date',
      default: new Date().toLocaleDateString()
    },
  ]);
  console.log(release);

  // createNewRelease(release);
})()
