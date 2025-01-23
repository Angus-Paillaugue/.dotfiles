<script>
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { CARDS_COLORS } from '$lib/constants';
  import Button from '$lib/components/Button.svelte';
  import { EyeOpen, EyeClosed } from '$lib/components/icons';
  import { scale } from 'svelte/transition';
  import { accordion } from '$lib/utils';

  const { form } = $props();
  let isSendingForm = $state(false);
  let passwordVisible = $state(false);
  let error = $state({ display: false, message: '' });

  $effect(() => {
    if(form?.error) {
      error.display = true;
      error.message = form.error;
    }else {
      error.display = false;
      error.message = '';
    }
  });

  $inspect(error)
</script>

<svelte:head>
  <title>Log-in</title>
</svelte:head>

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
      class="w-full rounded-full bg-neutral-800 px-6 py-3 text-base font-medium text-text-heading-dark h-12 outline-0 placeholder:text-text-body focus:outline-0"
      name="username"
      placeholder="Username"
    />
    <div class="flex flex-row relative">
      <input
        type={passwordVisible ? 'text' : "password"}
        class="w-full rounded-l-full bg-neutral-800 px-6 py-3 text-base font-medium text-text-heading-dark outline-0 placeholder:text-text-body focus:outline-0"
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

    <Button disabled={isSendingForm} type="submit">
      {#if isSendingForm}
        <Spinner />
      {/if}
      Log-in
    </Button>

      <div
        class="rounded-full bg-red-600 px-6 py-2 text-base font-semibold text-text-heading-dark"
      >
        {error.message}
      </div>

    <div class="flex flex-row items-center text-sm justify-center py-4 gap-2 rounded-lg bg-neutral-50 text-text-body">
      <p>No account yet ?</p>
      <a href="/sign-in" class="font-semibold text-text-heading"
        >Create one</a
      >
    </div>
  </form>
</div>

<style>
  :global(body) {
    @apply bg-white text-text-body
  }
</style>
