import { readFileSync, writeFileSync } from 'fs';

function checkRelease(release) {
  if(!release.version) {
    throw new Error('Version is required');
  }
  if (!release.description) {
    throw new Error('A description is required');
  }
}

function createNewRelease(release) {
  checkRelease(release);

  if (!release.date) {
    release.date = new Date().toISOString();
  }

  const changeLogFile = JSON.parse(readFileSync('../src/routes/releases/releases.json', 'utf-8'));
  const lastVersion = changeLogFile.at(-1);

  console.log(lastVersion, parseInt(lastVersion.version.slice(1)));

}


const release = {
  version: '1.0.0',
  description: 'Initial release',
};
createNewRelease(release);
