<script>
  const { children } = $props();
</script>

<div class="bg-primary-600 text-white w-fit p-2 rounded-tl-md rounded-br-md">
  <h1 class="font-bold text-xl m-0">{@render children()}</h1>
</div>
