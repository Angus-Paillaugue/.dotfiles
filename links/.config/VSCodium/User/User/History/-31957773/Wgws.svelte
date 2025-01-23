<script>
	import { Card, Button } from "$lib/components";
	import {Input} from "$lib/components";
</script>

<div class="max-w-xl mx-auto">
  <Card>
    <Card.Heading>Log-in</Card.Heading>

    <form action="?/log-in" class="flex flex-col gap-2">

      <Input placeholder="eg: John Doe" label="Username" id="username" />
    </form>
  </Card>
</div>
