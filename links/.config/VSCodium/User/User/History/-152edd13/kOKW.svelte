<script>
  import { page } from '$app/stores';
  import { bionicReadingEnabled } from '$lib/stores';
  import { cn } from '$lib/utils';
  import HomeFill from '$lib/components/icons/HomeFill.svelte';
  import HomeBorder from '$lib/components/icons/HomeBorder.svelte';
	import BookmarkFill from '$lib/components/icons/BookmarkFill.svelte';
	import BookmarkBorder from '$lib/components/icons/BookmarkBorder.svelte';

  let activeNavLink = $state();

	page.subscribe((value) => {
		if (value.url.pathname === '/') {
			activeNavLink = 'home';
		} else if (value.url.pathname.startsWith('/bookmarks')) {
			activeNavLink = 'bookmarks';
		}
	});
</script>


<!-- <div class="h-24"></div>
<div
  class="flex flex-row items-center justify-center p-4 fixed bottom-0 left-0 right-0 z-[10001]"
>
  <div class="flex flex-row gap-4 rounded-full p-2">
    <a
      href="/"
      class={cn(
        'size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 ring-neutral-900',
        activeNavLink === 'home' && 'bg-neutral-100 text-neutral-800'
      )}
      style="--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(15px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);"
      aria-label="Home"
    >
      {#if activeNavLink === 'home'}
        <HomeFill class="size-full" />
      {:else}
        <HomeBorder class="size-full" />
      {/if}
    </a>
    <button
      onclick={() => {
        $bionicReadingEnabled = !$bionicReadingEnabled;
      }}
      class={cn(
        'size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 flex flex-col items-center justify-center ring-neutral-900',
        $bionicReadingEnabled && 'bg-neutral-100 text-neutral-800'
      )}
      style="--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(15px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);"
      aria-label="Search"
    >
      <h1 class="text-inherit text-4xl font-bold">Br</h1>
    </button>
    <a
      href="/bookmarks"
      class={cn(
        'size-14 rounded-full bg-neutral-800 text-neutral-100 p-2 ring-neutral-900',
        activeNavLink === 'bookmarks' && 'bg-neutral-100 text-neutral-800'
      )}
      style="--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(15px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);"
      aria-label="Bookmarks"
    >
      {#if activeNavLink === 'bookmarks'}
        <BookmarkFill class="size-full" />
      {:else}
        <BookmarkBorder class="size-full" />
      {/if}
    </a>
  </div>
</div> -->
<div class="navbar flex items-center justify-center">
    <!-- Home Icon -->
    <div class="icon w-12 h-12 rounded-full flex items-center justify-center bg-gray-700 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 3l9 6.75v9.75a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-6h-6v6a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 013 19.5V9.75z" />
        </svg>
    </div>

    <!-- Search Icon -->
    <div class="icon w-12 h-12 rounded-full flex items-center justify-center bg-gray-700 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5L21 21zm-10.5-6a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
        </svg>
    </div>

    <!-- Bookmark Icon -->
    <div class="icon w-12 h-12 rounded-full flex items-center justify-center bg-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="none" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 3.75H6.75A2.25 2.25 0 004.5 6v15l7.5-3.75 7.5 3.75V6a2.25 2.25 0 00-2.25-2.25z" />
        </svg>
    </div>
</div>

<style>
.navbar {
    background-color: #333;
    padding: 0.5rem;
    border-radius: 9999px;
    position: relative;
    display: flex;
    gap: 0.5rem;
    /* Creating the "figure eight" shape */
    background: linear-gradient(90deg, #333 25%, #ffffff 50%, #333 75%);
    padding: 0.5rem;
    clip-path: polygon(0 100%, 25% 0, 75% 0, 100% 100%);
}

.icon {
    transition: background-color 0.3s ease;
}

.icon:hover {
    background-color: #666;
}

.icon:nth-child(3) {
    background-color: white; /* Active state for the third icon */
}

.icon:nth-child(3) svg {
    fill: black;
}
</style>
