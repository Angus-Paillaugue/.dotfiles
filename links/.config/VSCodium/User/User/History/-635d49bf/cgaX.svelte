<script>
  import { Dropdown, Button } from '$lib/components';
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
  <Dropdown>
    <Dropdown.Trigger>
      Open
    </Dropdown.Trigger>
    {#snippet items()}
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
