<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

  const { children } = $props();
  let activeNavLink = $state();

  page.subscribe((value) => {

    if(value.route.id === '/') {
      activeNavLink = 'home';
    } else if(value.route.id.startsWith('/search')) {
      activeNavLink = 'search';
    } else if(value.route.id.startsWith('/bookmarks')) {
      activeNavLink = 'bookmarks';
    }
  });
</script>

<div class="min-h-screen flex flex-col">

  <div class="grow flex flex-col">
    {@render children()}
  </div>

  <div class="h-24"></div>
  <div class="flex flex-row items-center justify-center p-4 fixed bottom-0 left-0 right-0 z-[10001]">
    <div class="flex flex-row gap-2 rounded-full p-2 bg-neutral-900">
      <a href="/" class={cn("size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 transition-colors", activeNavLink === 'home' && 'bg-neutral-100 text-neutral-800')} aria-label="Home">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6l2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2z" clip-rule="evenodd"/></svg>
      </a>
      <a href="/search" class={cn("size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 transition-colors", activeNavLink === 'search' && 'bg-neutral-100 text-neutral-800')} aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24"><g fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/><path fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414" clip-rule="evenodd"/></g></svg>
      </a>
      <a href="/bookmarks" class={cn("size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 transition-colors", activeNavLink === 'bookmarks' && 'bg-neutral-100 text-neutral-800')} aria-label="Bookmarks">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 24 24"><path fill="currentColor" d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.8 1.8 0 0 0 16.167 2z"/></svg>
      </a>
    </div>
  </div>
</div>
