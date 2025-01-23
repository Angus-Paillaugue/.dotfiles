---
lastModified: 08-17-2024
---

<script>
  import { Dropdown } from "$lib/components"
</script>

<Dropdown>
  <Dropdown.Trigger type="normal">
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
