<script>
  const { type, path, children } = $props();
</script>

<div class="pt-2.5 pb-5 my-2.5 border-gray-100 dark:border-gray-800/50 border-b">
  <div class="flex font-mono text-sm">
    <div class="flex-1 flex content-start py-0.5 mr-5">
      <div class="flex items-center flex-wrap gap-2">
        <div class="font-bold text-primary-800 dark:text-primary-600">
          <span class="text-gray-500 dark:text-gray-400"></span>{path}
        </div>
        <div class="flex items-center space-x-2 text-xs font-medium">
          <div
            class="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
          >
            {type}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4 prose-sm prose-gray dark:prose-invert">
    <p>{@render children()}</p>
  </div>
</div>
