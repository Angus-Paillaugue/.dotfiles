<script lang="ts">
  import '../app.css';
  import { Toaster } from '$lib/components/ui/sonner/index.js';
  import { pageMetadata } from '$lib/stores';
  import { page } from '$app/stores';
  import { ModeWatcher, theme } from 'mode-watcher';
  import { onMount } from 'svelte';

  let { children } = $props();
  const SITE_NAME = 'Logify';

  $inspect($page.url.pathname)

  onMount(() => {
    if ($page.url.pathname == '/') {
      $theme = "light"
    }
  })
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href.split('#')[0]} />
  <meta property="twitter:domain" content={$page.url.hostname} />
  <meta property="twitter:url" content={$page.url.href.split('#')[0]} />
  <meta property="og:url" content={$page.url.href.split('#')[0]} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={SITE_NAME} />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@logify" />
  <meta name="twitter:creator" content="@logify" />
  <meta name="twitter:domain" content={$page.url.hostname} />
  <meta name="twitter:url" content={$page.url.href.split('#')[0]} />

  <!-- Dynamic data -->
  <title>{$pageMetadata.title} | {SITE_NAME}</title>
  <meta property="og:title" content="{$pageMetadata.title} | {SITE_NAME}" />
  <meta property="twitter:title" content="{$pageMetadata.title} | {SITE_NAME}" />

  <meta name="description" content={$pageMetadata.description} />
  <meta property="og:description" content={$pageMetadata.description} />
  <meta property="twitter:description" content={$pageMetadata.description} />

  <!-- Favicons -->
  {#if $theme}
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/{$theme}/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/{$theme}/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/{$theme}/favicon-16x16.png" />
  {/if}
</svelte:head>

<Toaster />

<ModeWatcher />

{@render children?.()}
