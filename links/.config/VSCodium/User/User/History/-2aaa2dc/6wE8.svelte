<script>
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import { Button } from '$lib/components';

  const { children } = $props();
  let activePath = $state('');
  let container = $state();

  $effect(() => {
    activePath = new URL($page.url).pathname
  });
</script>

<div class="h-screen">
  <div class={cn("flex flex-col h-full p-2", activePath === '/' ? 'bg-neutral-300/50' : 'bg-body-dark')}>
    <div class="max-w-screen-2xl flex flex-row items-center justify-between w-full px-4 mx-auto rounded-xl text-text-heading bg-white h-16 mb-2">
      <a href="/"><span>News Dating</span></a>
      <Button href="/log-in" class={cn('w-fit',(activePath === '/log-in' || activePath === '/sign-in') && 'underline underline-offset-2 font-medium')}>Get started</Button>
    </div>

    <div class="grow h-full overflow-y-auto rounded-3xl no-scrollbar">
      {@render children()}
    </div>
  </div>
</div>
