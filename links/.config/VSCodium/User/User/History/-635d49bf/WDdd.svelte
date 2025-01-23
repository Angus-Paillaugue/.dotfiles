<script>
  import Dropdown from '$lib/components/Dropdown.svelte';
</script>


<Dropdown>
  <div slot="trigger">
    <button>Click me</button>
  </div>
  <div slot="content">
    <p>Some content</p>
  </div>
</Dropdown>
