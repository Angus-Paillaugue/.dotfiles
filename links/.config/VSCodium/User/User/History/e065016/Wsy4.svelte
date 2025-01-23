<script>
  const { name, description, children } = $props();
</script>

<div class="rounded-md border border-neutral-300/50 dark:border-neutral-700/50">
  <div
    class="border-primary-600 bg-primary-400/50 dark:border-primary-400 dark:bg-primary-900/50 text-primary-950 dark:text-primary-50 w-fit p-2 rounded-tl-md rounded-br-md border-2"
  >
    <h1 class="font-bold text-xl m-0">{name}</h1>
  </div>
  {#if description}
    <p class="mx-4 mt-6 mb-0 leading-7">
      {description}
    </p>
  {/if}

  {@render children()}
</div>
