<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { pageMetadata } from '$lib/stores';
  import { theme } from 'mode-watcher';
  import logInImageDark from '$lib/assets/logInImageDark.jpg?enhanced';
  import logInImageLight from '$lib/assets/logInImageLight.jpg?enhanced';

  const { form } = $props();
  let isLoading: boolean = $state(false);

  pageMetadata.set({
    title: 'Register',
    description: 'Create a new Logify account',
    breadcrumbs: []
  });

  $effect(() => {
    if (form?.error) {
      toast.error(form.message);
    }
  });
</script>

<div
  class="container relative hidden h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
  <Button href="/log-in" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
    Login
  </Button>
  <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
    <div class="absolute inset-0">
      {#if $theme === 'dark'}
        <enhanced:img src={logInImageDark} alt="" class="size-full object-cover" />
      {:else}
        <enhanced:img src={logInImageLight} alt="" class="size-full object-cover" />
      {/if}
    </div>
    <div class="relative z-20 flex items-center text-lg font-medium">Logify</div>
  </div>
  <div class="lg:p-8">
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
      </div>

      <div class="grid gap-6">
        <form
          method="POST"
          action="?/register"
          use:enhance={() => {
            isLoading = true;
            return async ({ update }) => {
              isLoading = false;
              update();
            };
          }}
        >
          <div class="grid gap-2">
            <div class="grid gap-1">
              <Label class="sr-only" for="email">E-mail</Label>
              <Input
                id="email"
                name="username"
                placeholder="Email"
                type="text"
                autocapitalize="none"
                autocomplete="email"
                autocorrect="off"
              />
            </div>
            <div class="grid gap-1">
              <Label class="sr-only" for="email">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                autocapitalize="none"
                autocomplete="username"
                autocorrect="off"
              />
            </div>
            <div class="grid gap-1">
              <Label class="sr-only" for="email">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                autocapitalize="none"
                autocomplete="current-password"
                autocorrect="off"
              />
            </div>
            <Button type="submit" loading={isLoading} disabled={isLoading}>Register</Button>
          </div>
        </form>
      </div>
      <p class="px-8 text-center text-sm text-muted-foreground">
        By clicking register, you agree to our
        <a href="/terms-of-services" class="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>
        and
        <a href="/privacy-policy" class="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  </div>
</div>
