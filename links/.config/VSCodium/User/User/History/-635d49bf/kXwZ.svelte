<script>
  import Dropdown from '$lib/components/Dropdown';
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
  <Dropdown>
    <Dropdown.Trigger>
      Open
    </Dropdown.Trigger>
    {#snippet dropDownList()}
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Item href="/profile">
        Profile
      </Dropdown.Item>
    {/snippet}
  </Dropdown>
</div>
