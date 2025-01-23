<script>
	import { Card, Button } from "$lib/components";
	import Sidebar from "./sidebar.svelte";

  let open = $state(false);
</script>

<Sidebar bind:open />

<div class="max-w-xl mx-auto">
  <Card>
    <Card.Heading>Test</Card.Heading>
    <Button variant="secondary" onclick={() => (open = true)}>secondary</Button>
  </Card>
</div>
