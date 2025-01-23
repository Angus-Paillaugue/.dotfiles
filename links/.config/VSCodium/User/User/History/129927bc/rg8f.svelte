<script>
  import releases from './releases.json';
  import Icon from '@iconify/svelte'
</script>

<div class="max-w-screen-md mx-auto p-8 flex flex-col">
  {#each releases as release}
    <a href="/release/{release.version}" class="border border-main dark:border-main-dark rounded relative p-6 group">
      <h1>{release.version}</h1>
      <small>{release.date}</small>
      <p>{release.description}</p>
      <span class="absolute top-2 right-2 transition-all rotate-[45deg]">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-8" />
      </span>
    </a>
  {/each}
</div>
