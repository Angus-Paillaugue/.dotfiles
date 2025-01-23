<script>
  import { Button } from '$lib/components';
  import { project } from '$conf';

  const { data } = $props()
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />
</svelte:head>

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body -mt-16">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <h1>Welcome</h1>

    <Button href="/docs/{docsHomePage}"></Button>
  </main>
</div>
