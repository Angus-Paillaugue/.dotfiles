<script>
  import releases from './releases.json';
  import Icon from '@iconify/svelte'
</script>

<div class="max-w-screen-md mx-auto p-8 flex flex-col">
  {#each releases as release}
    <a href="/release/{release.version}" class="border border-main dark:border-main-dark rounded relative p-6 group">
      <h1 class="m-0">{release.version}</h1>
      <small>{release.date}</small>
      <p class="m-0 mt-4">{release.description}</p>
      <span class="absolute top-2 right-2 transition-all opacity-0 group-hover:opacity-100 -rotate-[45deg] -translate-x-1/2 translate-y-1/2 group-hover:translate-x-0 group-hover:translate-y-0">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-8" />
      </span>
    </a>
  {/each}
</div>
