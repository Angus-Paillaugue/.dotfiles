<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} | Skill Forge</title>
	<meta property="og:title" content="{$page.status} | Skill Forge" />
	<meta property="twitter:title" content="{$page.status} | Skill Forge" />

	<meta name="description" content="A {$page.status} error occurred : {$page.error.message}" />
	<meta
		property="og:description"
		content="A {$page.status} error occurred : {$page.error.message}"
	/>
	<meta
		property="twitter:description"
		content="A {$page.status} error occurred : {$page.error.message}"
	/>
</svelte:head>

{#if $page.status === 404}
	<div class="mx-auto w-full grow p-4 md:max-w-[888px] md:p-6 lg:max-w-screen-xl">
		<div
			class="mt-40 flex w-full flex-col items-center justify-center space-y-2 md:flex-row md:space-x-[20px] md:space-y-0"
		>
			<img
				class="w-[270px]"
				src="https://leetcode.com/static/images/404_face.png"
				alt={$page.status}
			/>
			<div class="flex flex-col gap-2">
				<h1 class="text-2xl font-bold text-neutral-100">{$page.error.message}</h1>
				<p class="max-w-[300px] text-sm text-neutral-400">
					Sorry, but we can't find the page you are looking for...
				</p>
				<a
					href="/"
					class="w-fit rounded-xl bg-neutral-700 px-3 py-1 text-base font-medium transition-colors hover:bg-neutral-700/50"
					>Go home</a
				>
			</div>
		</div>
	</div>
{:else}
	<div class="mx-auto w-full grow p-4 md:max-w-[888px] md:p-6 lg:max-w-screen-xl">
		<div class="mt-40 text-center flex w-full flex-col items-center justify-center space-y-2">
			<h1 class="text-8xl font-black">{$page.status}</h1>
			<p class="max-w-[300px] text-sm text-neutral-400">
				{$page.error.message}
			</p>
			<a
				href="/"
				class="w-fit rounded-xl bg-neutral-700 px-3 py-1 text-base font-medium transition-colors hover:bg-neutral-700/50"
				>Go home</a
			>
		</div>
	</div>
{/if}
