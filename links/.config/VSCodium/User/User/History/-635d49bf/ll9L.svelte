<script>
  import Dropdown from '$lib/components/Dropdown';
</script>


<Dropdown>
  <Dropdown.Trigger>
    Open
  </Dropdown.Trigger>
  {#snippet dropDownList()}
    <Dropdown.Item>
      <a
        href="/profile"
        class="flex items-center gap-2 p-2 hover:bg-neutral-200"
      >
        <i class="bi bi-person-fill"></i>
        Profile
      </a>
    </Dropdown.Item>
  {/snippet}
</Dropdown>
