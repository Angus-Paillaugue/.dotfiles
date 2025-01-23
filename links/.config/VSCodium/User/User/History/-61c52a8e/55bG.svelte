<script>
  const { children, title, description, ...restProps } = $props();
</script>

<svelte:head>
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
