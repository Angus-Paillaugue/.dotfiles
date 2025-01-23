<script>
  const { json } = $props();
</script>

<pre class="bg-[var(--inline-code-bg)] text-neutral-300 px-4 py-2 text-lg">
  {JSON.stringify(json, null, 2)}
</pre>
