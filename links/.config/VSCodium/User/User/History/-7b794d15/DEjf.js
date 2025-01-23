import releases from '../releases.json';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { version } = params;
  const release = releases.find((r) => r.version === version);
  if (!release) throw new Error('Release not found');

  return { release };
}
