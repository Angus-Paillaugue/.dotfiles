<script>
	import { Badge, Divider } from 'geist-ui-svelte';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';


	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').LayoutData} data
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { data, children } = $props();
	const { user } = data;
</script>

{#if user && $page.params.username === user.username}
	<div
		class="w-full pt-4 flex flex-row gap-4 items-center justify-start overflow-x-auto no-scollbar"
	>
		<a href="/u/{user.username}">
			<Badge
				size="lg"
				ghost={$page.url.pathname !== `/u/${user.username}`}
				class="cursor-pointer rounded-md">My account</Badge
			>
		</a>
		<a href="/u/{user.username}/settings">
			<Badge
				size="lg"
				ghost={!$page.url.pathname.includes('settings')}
				class="cursor-pointer rounded-md">{$_('account.settings')}</Badge
			>
		</a>
	</div>
	<Divider margin="lg" />
{/if}

{@render children?.()}
