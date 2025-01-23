<script>
	import { Card, Button, Input } from "$lib/components";
  import { enhance } from '$app/forms';

  let { form } = $props();

  let isSubmitting = $state(false);
</script>

<div class="max-w-xl w-full mx-auto grow">
  <Card class="w-full mt-[150px]">
    <Card.Heading>Log-in</Card.Heading>

    <form
      action="?/logIn"
      method="POST"
      class="flex flex-col gap-2 mt-6"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          await update({ reset: false });
          isSubmitting = false;
        };
      }}
    >

      <Input label="Username" id="username" />
      <Input type="password" label="Password" id="password" />

      <Button type="submit" loading={isSubmitting} class="mt-4 w-full" variant="primary">Log-in</Button>

      {#if form && form.message}
        <p class="text-red-500 text-sm mt-2">{form.message}</p>
      {/if}
    </form>
  </Card>
</div>
