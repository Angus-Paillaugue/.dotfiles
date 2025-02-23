<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { pageMetadata } from '$lib/stores';

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
    <div
      class="absolute inset-0 bg-cover"
      style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
    ></div>
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
