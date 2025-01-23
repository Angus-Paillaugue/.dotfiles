import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Asynchronously walks through a directory and yields the paths of all files.
 * @param {string} dir - The directory path to walk through.
 * @returns {AsyncGenerator<string>} - An async generator that yields the paths of all files in the directory.
 */
async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory() && !isIgnoredDirectory(entry)) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

function isIgnoredDirectory(dir) {
  const ignoredDirectories = ['node_modules', '.git', '.svelte-kit', '.vercel', '.vscode', 'backup'];
  return ignoredDirectories.some((ignoredDir) => dir.includes(ignoredDir));
}

function replaceShadeInFile(filePath, baseShade, newShade) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const newFileContents = fileContents.replace(
    new RegExp(`\\b(${baseShade}-\\d{2,3})\\b`, 'g'),
    (match) => {
      return match.replace(baseShade, newShade);
    }
  ).replace(
    new RegExp(`\\b(colors.${baseShade}.\\d{2,3})\\b`, 'g'),
    (match) => {
      return match.replace(`colors.${baseShade}`, `colors.${newShade}`);
    }
  );

  fs.writeFileSync(filePath, newFileContents);
}

/**
 * Updates the colors in the files located in the './' directory by replacing the base shade with a new shade.
 *
 * @param {string} newShade - The new shade to replace the base shade with.
 * @returns {Promise<void>} - A promise that resolves once the colors have been updated.
 */
export async function chooseTailwindGrayShade(newShade) {
  const baseShade = 'neutral';
  for await (const filePath of walk('./')) {
    replaceShadeInFile(filePath, baseShade, newShade);
  }

  console.log(chalk.green('✓ ') + 'Updated colors to ' + chalk.bold(newShade));
}
