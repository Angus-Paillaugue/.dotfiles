<script>
  const { type, path, default: defaultValue, required = false, children } = $props();
</script>

<div class="pt-5 my-5 border-neutral-300/50 dark:border-neutral-700/50 border-t px-4 prop">
  <div class="flex items-center flex-wrap gap-2">
    <span class="font-bold text-primary-800 dark:text-primary-600">
      {path}
    </span>
    <div class="flex items-center space-x-2 text-xs font-medium">
      <div
        class="px-2 py-0.5 rounded-md bg-neutral-600/20 border-neutral-700 dark:text-neutral-100 text-neutral-900"
      >
        {type}
      </div>
      {#if required}
        <div
          class="px-2 py-0.5 rounded-md bg-red-600/20 border-red-700 dark:text-red-100 text-red-900"
        >
          Required
        </div>
      {/if}
      {#if defaultValue}
        <div
          class="px-2 py-0.5 rounded-md bg-primary-600/20 border-primary-700 dark:text-primary-100 text-primary-900"
        >
          Default: {defaultValue}
        </div>
      {/if}
    </div>
  </div>
  <p class="mt-2 m-0 dark:text-neutral-400 text-neutral-700">{@render children()}</p>
</div>
