<script>
	import { Card, Button } from "$lib/components";
	import {Input} from "$lib/components";
</script>

<div class="max-w-xl w-full mx-auto grow">
  <Card class="w-full mt-[150px]">
    <Card.Heading>Log-in</Card.Heading>

    <form action="?/log-in" class="flex flex-col gap-2 mt-6">

      <Input placeholder="eg: John Doe" label="Username" id="username" />
      <Input type="password" placeholder="eg: John Doe" label="Password" id="password" />
    </form>
  </Card>
</div>
