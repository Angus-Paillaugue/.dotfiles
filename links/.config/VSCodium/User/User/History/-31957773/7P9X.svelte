<script>
	import { Card, Button, Input } from "$lib/components";
  import { enhance } from '$app/forms';
</script>

<div class="max-w-xl w-full mx-auto grow">
  <Card class="w-full mt-[150px]">
    <Card.Heading>Log-in</Card.Heading>

    <form action="?/logIn" method="POST" class="flex flex-col gap-2 mt-6">

      <Input label="Username" id="username" />
      <Input type="password" label="Password" id="password" />

      <Button type="submit" class="mt-4 w-full" variant="primary">Log-in</Button>
    </form>
  </Card>
</div>
