<script>
	import { Card, Button } from "$lib/components";
	import Sidebar from "./sidebar.svelte";

</script>

<Sidebar />

<div class="max-w-xl mx-auto">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">secondary</Button>
  <Button variant="icon">icon</Button>
  <Button variant="danger">danger</Button>
  <Card>
    <Card.Heading>Test</Card.Heading>
  </Card>
</div>
