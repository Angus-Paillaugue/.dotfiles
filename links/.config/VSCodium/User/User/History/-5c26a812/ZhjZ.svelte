<script>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
</script>

<!-- Spacer -->
<div class="h-24"></div>

<!-- Navbar -->
<nav
	class="fixed bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-2*0.5rem)] max-w-screen-sm h-14 z-40 border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-999 rounded-lg shadow-md flex flex-row gap-2 justify-between items-center px-6 py-4 text-gray-400"
>
	<a
		href="/items"
		class="rounded-full p-2 {$page.url.pathname?.startsWith('/items') &&
			'dark:bg-gray-925 bg-gray-200 dark:text-gray-200 text-gray-925'}"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M16 21H8a1 1 0 0 1-1-1v-7.93l-1.3 1.05c-.39.38-1.02.38-1.41 0l-2.83-2.83a.996.996 0 0 1 0-1.41L7.34 3H9c0 1.1 1.34 2 3 2s3-.9 3-2h1.66l5.88 5.88c.39.39.39 1.02 0 1.41l-2.83 2.83c-.39.38-1.02.38-1.41 0L17 12.07V20a1 1 0 0 1-1 1m4.42-11.42l-4.31-4.3c-.31.35-.68.66-1.11.92c-.84.5-1.87.8-3 .8c-1.7 0-3.21-.68-4.11-1.72l-4.31 4.3L5 11l3-2h1v10h6V9h1l3 2z"
			/>
		</svg>
	</a>
	<a
		href="/create"
		class="h-14 w-14 rounded-full bg-gray-925 text-white flex items-center justify-center -mt-8 ring-4 ring-white dark:ring-gray-999 transition-all"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.2"
			stroke="currentColor"
			class="w-8 h-8"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</a>
	<a
		href="/u"
		class="rounded-full p-2 {$page.url.pathname?.startsWith('/u') &&
			'dark:bg-gray-925 bg-gray-200 dark:text-gray-200 text-gray-925'}"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
			/>
		</svg>
	</a>
</nav>
