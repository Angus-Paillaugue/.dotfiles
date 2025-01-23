<script>
  import { page } from '$app/stores';

  const { children, title, description } = $props();
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href.split('#')[0]} />
	<meta property="twitter:domain" content={$page.url.hostname} />
	<meta property="twitter:url" content={$page.url.href.split('#')[0]} />

	<meta property="og:url" content={$page.url.href.split('#')[0]} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Skill-Forge" />

	<title>{title} | Skill Forge</title>
	<meta property="og:title" content="{title} | Skill Forge" />
	<meta property="twitter:title" content="{title} | Skill Forge" />

	<meta
		name="description"
		content={description}
	/>
	<meta
		property="og:description"
		content={description}
	/>
	<meta
		property="twitter:description"
		content={description}
	/>

  {@render children?.()}
</svelte:head>
