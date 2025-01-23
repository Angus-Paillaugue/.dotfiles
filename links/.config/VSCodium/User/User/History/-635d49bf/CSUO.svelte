<script>
  import Dropdown from '$lib/components/Dropdown';
  import Item from '../../lib/components/Dropdown/Item.svelte';
</script>


<Dropdown>
  <div slot="trigger">
    <button>Click me</button>
  </div>
  <Dropdown.Item>
    <a href="/test">Test</a>
  </Dropdown.Item>
</Dropdown>
