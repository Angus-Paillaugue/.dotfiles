<script>
  const { method = 'GET', path, headers, body, ...restProps } = $props();
</script>


<div class="border rounded-md border-neutral-300/50 dark:border-neutral-700/50 p-2 items-center">
  <div class="http-keyword w-fit" data-keyword={method.toLocaleUpperCase()}>{method.toLocaleUpperCase()}</div>
  <span class="h-full w-px bg-neutral-300/50 dark:bg-neutral-700/50"></span>
</div>
