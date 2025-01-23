import { writeFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registryFilePath = path.resolve(__dirname, '../src/lib/Demos/index.js');

const allDemos = readdirSync(path.resolve(__dirname, '../src/lib/Demos/')).filter(
  (file) => file !== 'index.js'
);

const temnplate = `
  {{name}}: {
    component: () => import('./{{name}}.svelte').then((m) => m.default),
    raw: () => import('./{{name}}.svelte?raw').then((m) => m.default)
  },
`;

const fileStart = `export const registry = {\n`;
const fileEnd = `};`;

const registry = fileStart + allDemos.reduce((acc, demo) => {
  return acc + temnplate.replace(/{{name}}/g, demo.replace('.svelte', ''));
} , '') + fileEnd;

writeFileSync(registryFilePath, registry);
