<script>
  const { type, path, default: defaultValue, required = false, children } = $props();
</script>

<div class="pt-2.5 pb-5 my-2.5 border-gray-100 dark:border-gray-800/50 border-b">
  <div class="flex font-mono text-sm">
    <div class="flex-1 flex content-start py-0.5 mr-5">
      <div class="flex items-center flex-wrap gap-2">
        <span class="font-bold text-primary-800 dark:text-primary-600">
          {path}
        </span>
        <div class="flex items-center space-x-2 text-xs font-medium">
          <div
            class="px-2 py-0.5 rounded-md bg-gray-200/50 dark:bg-neutral-700/50 text-gray-600 dark:text-gray-200"
          >
            {type}
          </div>
          {#if required}
            <div
              class="px-2 py-0.5 rounded-md bg-primary-400/50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-200"
            >
              Required
            </div>
          {/if}
          {#if defaultValue}
            <div
              class="px-2 py-0.5 rounded-md bg-primary-400/50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-200"
            >
              Default: {defaultValue}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <p class="mt-4 dark:text-neutral-400 text-neutral-700">{@render children()}</p>
</div>
