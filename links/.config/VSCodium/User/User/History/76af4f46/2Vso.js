import fs from 'fs';
import path from 'path';

async function* walk(dir) {
	for await (const d of await fs.promises.opendir(dir)) {
		const entry = path.join(dir, d.name);
		if (d.isDirectory()) yield* walk(entry);
		else if (d.isFile()) yield entry;
	}
}

export async function chooseTailwindGrayShade(newShade) {
  const baseShade = 'blue';
  for await (const filePath of walk('src')) {
    console.log(`\x1b[33m 󰒬\x1b[0m Writing to ${filePath}`);

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const newFileContents = fileContents.replace(new RegExp(`\\b(${baseShade}-\\d{1,3})\\b`, 'g'), function (match) {
			return match.replace(baseShade, newShade);
		});

    fs.writeFileSync(filePath, newFileContents);
  }

  console.log('\x1b[32m ✓\x1b[0m Done');
}
