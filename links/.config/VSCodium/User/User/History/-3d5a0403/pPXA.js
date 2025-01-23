import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

  console.log(isNewerVersion(lastVersion.version, release.version));
}


const release = {
  version: '1.1',
  description: 'Initial release',
};
createNewRelease(release);
