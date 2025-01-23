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
  for await (const filePath of walk('src')) {
    console.log(filePath);

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const newFileContents = fileContents.replace(/\b(gray-\d{1,3})\b/g, function (match) {
      return match.replace('gray', newShade);
    });

    fs.writeFileSync(filePath, newFileContents);
  }

  console.log(
		'%cStyling is %cfun',
		'color: #00ff33; font-size: 14px',
		'text-transform:uppercase; font-size: 16px; color: #ff33dd'
	);
}
