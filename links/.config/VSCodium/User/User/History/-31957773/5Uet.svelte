<script>
	import { Card, Button } from "$lib/components";
	import {Input} from "$lib/components";
</script>

<div class="max-w-xl w-full mx-auto grow">
  <Card class="w-full mt-[150px]">
    <Card.Heading>Log-in</Card.Heading>

    <form action="?/log-in" class="flex flex-col gap-2 mt-6">

      <Input label="Username" id="username" />
      <Input type="password" label="Password" id="password" />

      <Button type="submit" class="mt-4 w-full">Log-in</Button>
    </form>
  </Card>
</div>
