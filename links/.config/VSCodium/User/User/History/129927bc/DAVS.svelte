<script>
  import releases from './releases.json';
  import Icon from '@iconify/svelte'
</script>

<div class="max-w-screen-2xl flex flex-col">
  {#each releases as release}
    <div class="border border-main dark:border-main-dark rounded relative p-6">
      <h1>{release.version}</h1>
      <small>{release.date}</small>
      <Icon icon="material-symbols:arrow-forward-ios-rounded" />
    </div>
  {/each}
</div>
