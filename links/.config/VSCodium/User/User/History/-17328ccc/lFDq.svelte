<script>
	import { Text, Spacer, Divider, Image, Button, Modal, MoonIcon, SunIcon } from 'geist-ui-svelte';
	import { seo, headerTitle } from '$lib/stores';
	import { _ } from 'svelte-i18n';
	import { getImageUrl } from '$lib/vetements';
	import { enhance, applyAction } from '$app/forms';
	import { pb } from '$lib/db';
	import { mode, setMode } from 'mode-watcher';
	import { scale } from 'svelte/transition';


	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	const { user } = $state(data);
	let logOutModal = $state(false);
	let loggingOut = $state(false);
	let isFollowing = $state(false);

	$seo.title = "Dashboard";
	$seo.description = $_('pageTitles.outfits');
	$headerTitle = null;

	/**
	 * Parses the given text.
	 *
	 * @param {string} text - The text to be parsed.
	 * @returns {any} - The parsed result.
	 */
	function parseText(text) {
		const result = text
			.replace(/<h1>/g, '<h1 class="text-3xl font-bold">')
			.replace(/<h2>/g, '<h2 class="text-2xl font-bold">')
			.replace(/<h3>/g, '<h3 class="text-xl font-bold">')
			.replace(/<h4>/g, '<h4 class="text-lg font-bold">')
			.replace(/<h5>/g, '<h5 class="text-md font-bold">')
			.replace(/<h6>/g, '<h6 class="text-base font-bold">')
			.replace(/<p>/g, '<p class="text-base">')
			.replace(/<a/g, '<a class="text-blue-600 dark:text-blue-400"');

		return result;
	}

	/**
	 * Function to handle mode change.
	 */
	function handleModeChange() {
		if ($mode === 'light') setMode('dark');
		else setMode('light');
	}
</script>

<div
	class="flex flex-col sm:flex-row items-start gap-2 lg:p-4 p-2 transition-all sm:pl-0 lg:h-[108px] md:h-[70px] mb-2 max-sm:-mt-10'}"
>

	<Text type="h2" class="w-full">
		<div class="w-full flex flex-row justify-between items-center">
			{#if isOwner}
				<span
					class="text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent pb-2"
				>
					{viewingUser.username}
				</span>
			{:else}
				{viewingUser.username}
				{#if user}
					<Button on:click={follow} loading={isFollowing}>
						<div class="flex flex-row gap-2">
							{#if user.following.includes(viewingUser.id)}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									in:scale={{ duration: 300 }}
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
								</svg>
								Following
							{:else}
								Follow
							{/if}
						</div>
					</Button>
				{/if}
			{/if}
		</div>
	</Text>
</div>

<div class="p-1">
	{#if !isOwner}
		<div class="bio">
			{@html parseText(viewingUser.bio)}
		</div>

		{#each outfits as outfit}
			<Spacer h={30} />
			<Divider />
			<Spacer h={5} />
			<a href="/u/{viewingUser.username}/{outfit.id}">
				<Text type="h3">{outfit.name}</Text>
			</a>
			<div class="grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));">
				{#each outfit.elements as item}
					<a
						href="/items/{item.id}"
						class="transition-all border ring-gray-100 dark:ring-gray-900 border-gray-100 dark:border-gray-900 text-gray-999 dark:text-gray-0 rounded-lg overflow-hidden flex flex-col justify-center"
					>
						<Image
							src={getImageUrl(item.collectionId, item.id, item.image)}
							alt={$_('imageOf') + ' ' + item.name}
							width="100%"
							height="auto"
						/>
					</a>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="grid grid-cols-2 gap-4">
			<button
				class="border rounded-xl dark:bg-gray-950 border-gray-100 dark:border-gray-900 p-4 dark:border-gray-800/50 hover:dark:bg-gray-900/50 hover:bg-gray-100/50 h-24 flex flex-col items-center justify-center transition-all"
				onclick={() => (logOutModal = true)}
			>
				<Text type="h5">{$_('account.logOut')}</Text>
			</button>

			<button
				class="border rounded-xl dark:bg-gray-950 border-gray-100 dark:border-gray-900 p-4 dark:border-gray-800/50 hover:dark:bg-gray-900/50 hover:bg-gray-100/50 h-24 flex flex-col items-center justify-center transition-all"
				onclick={handleModeChange}
			>
				{#if $mode == 'light'}
					<MoonIcon size={22} />
				{:else}
					<SunIcon size={22} />
				{/if}
			</button>
		</div>

		<Modal bind:visible={logOutModal} class="sm:max-w-[400px] h-fit">
			<form
				method="POST"
				action="/log-out"
				use:enhance={() => {
					loggingOut = true;
					return async ({ result }) => {
						pb.authStore.clear();
						await applyAction(result);
						loggingOut = false;
					};
				}}
				class="p-4 flex flex-col"
			>
				<Text type="h3">{$_('account.logOut')}</Text>
				<Spacer h={15} />
				<Text>{$_('account.LogOutConfirm')}</Text>
				<Spacer h={30} />
				<div class="flex flex-row justify-between items-center mt-auto">
					<Button
						type="button"
						on:click={() => {
							logOutModal = false;
						}}>{$_('labels.cancel')}</Button
					>
					<Button type="submit" color="error" ghost loading={loggingOut}
						>{$_('account.logOut')}</Button
					>
				</div>
			</form>
		</Modal>
	{/if}
</div>
