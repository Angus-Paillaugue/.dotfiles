<script>
  const { children } = $props();
</script>

<div class="bg-primary-800/50 text-white w-fit p-2 rounded-tl-md rounded-br-md border-2 border-primary-600">
  <p class="m-0">{@render children()}</p>
</div>
