/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { project } = params;
  console.log(project);
  const component = await import(`../../lib/projects/${project}.md`);
	return { component };
}
