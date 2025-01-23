<script>
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { CARDS_COLORS } from '$lib/constants';
  import Button from '$lib/components/Button.svelte';

  const { form } = $props();
  let isSendingForm = $state(false);
  function generatePastelColor() {
    const randomValue = () => Math.floor(Math.random() * 127 + 127); // Generate a value between 127 and 254
    const r = randomValue();
    const g = randomValue();
    const b = randomValue();

    return `rgb(${r}, ${g}, ${b})`;
  }

</script>

<svelte:head>
  <title>Log-in</title>
</svelte:head>

<div class="flex flex-row flex-wrap gap-2">
  {#each {length:50} as _}
    <div class="size-12 rounded-full" style="background-color: {generatePastelColor()};"></div>
  {/each}
</div>

<div
  class="relative flex h-screen w-full flex-col items-center justify-center p-4"
>
  <form
    class="flex w-full max-w-md flex-col gap-6 rounded-3xl p-6 text-text-heading"
    style="background-color: #{CARDS_COLORS[3]};"
    method="POST"
    use:enhance={() => {
      isSendingForm = true;
      return async ({ update }) => {
        await update();
        isSendingForm = false;
      };
    }}
  >
    <h1 class="text-3xl font-bold text-inherit">Log-in</h1>
    <input
      type="text"
      class="w-full rounded-full bg-neutral-800 px-6 py-3 text-base font-medium text-text-heading-dark outline-0 placeholder:text-text-body focus:outline-0"
      name="username"
      placeholder="Username"
    />
    <input
      type="password"
      class="w-full rounded-full bg-neutral-800 px-6 py-3 text-base font-medium text-text-heading-dark outline-0 placeholder:text-text-body focus:outline-0"
      name="password"
      placeholder="Password"
    />

    <Button disabled={isSendingForm} type="submit">
      {#if isSendingForm}
        <Spinner />
      {/if}
      Log-in
    </Button>

    {#if form?.error}
      <div
        class="rounded-full bg-red-600 px-6 py-2 text-base font-semibold text-text-heading-dark"
      >
        {form.error}
      </div>
    {/if}

    <a href="/sign-in" class="text-text-body underline underline-offset-2"
      >No account yet ?</a
    >
  </form>
</div>

<style>
  :global(body) {
    @apply bg-white text-text-body
  }
</style>
