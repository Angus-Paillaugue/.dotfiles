(async () => {
  const githubReleasesReq = await fetch(
    'https://api.github.com/repos/Angus-Paillaugue/SvelteShine/tags'
  );
  if (!githubReleasesReq.ok) {
    throw new Error('Failed to fetch github releases');
  }
  const githubReleases = await githubReleasesReq.json();
  console.log(githubReleases);
})();
