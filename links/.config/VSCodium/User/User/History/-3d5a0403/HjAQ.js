import { readFileSync, writeFileSync } from 'fs';

function checkRelease(release) {
  if(!release.version) {
    throw new Error('Version is required');
  }
  if (!release.description) {
    throw new Error('A description is required');
  }
}

export function createNewRelease(version) {
  checkRelease(version);

  if(!version.date) {
    version.date = new Date().toISOString();
  }

  const changeLogFile = JSON.parse(readFileSync('../src/routes/releases/releases.json', 'utf-8'));
  const lastVersion = changeLogFile.at(-1).version;
  

}
