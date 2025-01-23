<script>
  import Dropdown from '$lib/components/Dropdown';
</script>


<Dropdown>
  <Dropdown.Trigger>
    Open
  </Dropdown.Trigger>
  {#snippet dropDownList()}
    <Dropdown.Item href="/profile">
      Profile
    </Dropdown.Item>
  {/snippet}
</Dropdown>
