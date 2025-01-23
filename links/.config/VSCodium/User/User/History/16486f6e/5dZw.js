import { version } from '../project.config.js';
import { mkdirSync } from 'fs';
import inquirer from 'inquirer';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';
import directoryTree from 'directory-tree';
import path from 'path';

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

/**
 * Checks if a new version is newer than a last version.
 *
 * @param {string} lastVersion - The last version to compare.
 * @param {string} newVersion - The new version to compare.
 * @returns {boolean} Returns true if the new version is newer, false otherwise.
 */
function isNewerVersion(lastVersion, newVersion) {
  if (!lastVersion) return true;
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

function createBackup() {
  const backupDir = path.join(process.cwd(), 'backup');
  try {
    mkdirSync(backupDir);
    console.log('Backup directory created');
  } catch (_) {
    console.log('Backup directory already exists');
  }
  console.log(directoryTree(path.join(process.cwd(), './')));
  ;
}

(async () => {
  const githubReleasesReq = await fetch(
    'https://api.github.com/repos/Angus-Paillaugue/SvelteShine/tags'
  );
  if (!githubReleasesReq.ok) {
    throw new Error('Failed to fetch github releases');
  }
  const githubReleases = await githubReleasesReq.json();
  const latestGithubReleaseVersion = githubReleases[0].name;
  if (!isNewerVersion(version, latestGithubReleaseVersion)) {
    console.log('No new release found');
    return;
  }else {
    console.log(`New release found : ${version} -> ${latestGithubReleaseVersion}`);
    createBackup();
  }
})();
