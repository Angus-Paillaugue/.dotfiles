(async () => {
  const githubReleases = await fetch(
    'https://api.github.com/repos/Angus-Paillaugue/SvelteShine/tags'
  );
  console.log(githubReleases);
})();
