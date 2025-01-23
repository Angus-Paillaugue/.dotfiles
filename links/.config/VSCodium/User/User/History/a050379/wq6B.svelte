<script>
  import { enhance } from '$app/forms';
  import { CARDS_COLORS } from '$lib/constants';
  import { Button, Spinner } from '$lib/components';
  import { EyeOpen, EyeClosed } from '$lib/components/icons';
  import { scale } from 'svelte/transition';

  const { form } = $props();
  let isSendingForm = $state(false);
  let passwordVisible = $state(false);
</script>

<svelte:head>
  <title>Sign-in</title>
</svelte:head>

<div
  class="relative flex h-screen w-full flex-col items-center justify-center p-4 gap-10"
>
  <form
    class="flex w-full max-w-md flex-col gap-6 rounded-2xl p-6 text-text-heading"
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
    <h1 class="text-3xl font-bold text-inherit">Sign-in</h1>
    <input
      type="text"
      class="w-full rounded-full bg-neutral-800 px-6 py-3 text-base font-medium text-text-heading-dark h-12 outline-0 placeholder:text-text-body focus:outline-0"
      name="username"
      placeholder="Username"
    />
    <div class="flex flex-row relative">
      <input
        type={passwordVisible ? 'text' : "password"}
        class="w-full rounded-l-full bg-neutral-800 px-6 py-3 text-base h-12 font-medium text-text-heading-dark outline-0 placeholder:text-text-body focus:outline-0"
        name="password"
        placeholder="Password"
      />
      <img src="/password-input-end.svg" alt="" class="h-12 -ml-px">
      <button class="absolute right-2 top-2 rounded-full bg-white w-8 h-8 text-neutral-800 p-1" type="button" onclick={() => (passwordVisible = !passwordVisible)}>
        {#if passwordVisible}
          <span in:scale>
            <EyeOpen class="size-full" />
          </span>
        {:else}
          <span in:scale>
            <EyeClosed class="size-full" />
          </span>
        {/if}
      </button>
    </div>


    {#if form?.error}
      <div
        class="rounded-full bg-red-600 px-6 py-2 text-base font-semibold text-text-heading-dark"
      >
        {form?.error}
      </div>
    {/if}

    <Button disabled={isSendingForm} type="submit">
      {#if isSendingForm}
        <Spinner />
      {/if}
      Sign-in
    </Button>

  </form>

  <div class="flex flex-row items-center text-sm justify-center py-4 gap-2 rounded-2xl w-full max-w-md" style="background-color: #{CARDS_COLORS[0]};">
    <p class="text-text-body">Already an account ?</p>
    <Button variant="link" href="/log-in" class="font-semibold text-text-heading"
      >Log-in</Button
    >
  </div>
</div>

<style>
  :global(body) {
    @apply bg-white text-text-body
  }
</style>
