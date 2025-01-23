<script>
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/Spinner.svelte';
	import { CARDS_COLORS } from '$lib/constants';

	const { form } = $props();
	let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="pt-10 flex flex-col items-center justify-center p-2">
	<form
		class="max-w-md w-full rounded-3xl p-6 flex flex-col gap-6 text-text-heading"
		style="background-color: #{CARDS_COLORS[Math.floor(Math.random() * CARDS_COLORS.length)]};"
		method="POST"
		use:enhance={() => {
			isSendingForm = true;
			return async ({ update }) => {
				await update();
				isSendingForm = false;
			};
		}}
	>
		<h1 class="text-inherit text-3xl font-bold">Log-in</h1>
		<div class="flex w-full flex-col gap-1.5">
			<label for="username">Username</label>
			<input
				type="text"
				class="px-4 py-2 text-base font-medium rounded-full bg-neutral-800 w-full text-text-heading-dark placeholder:text-text-body focus:outline-0 outline-0"
				name="username"
				placeholder="username"
			/>
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<label for="password">Password</label>
			<input
				type="password"
				class="px-4 py-2 text-lg font-medium rounded-full bg-neutral-800 w-full text-text-heading-dark placeholder:text-text-body focus:outline-0 outline-0"
				name="password"
				placeholder="password"
			/>
		</div>

		<button
			disabled={isSendingForm}
			type="submit"
			class="flex flex-row items-center justify-center text-lg font-medium gap-2 w-full px-4 py-2 bg-neutral-800 rounded-full text-text-heading-dark"
		>
			{#if isSendingForm}
				<Spinner />
			{/if}
			Log-in
		</button>

		{#if form?.success == false}
			<div class="p-4 rounded-xl border border-red-600 text-red-600 font-semibold text-base">
				{form.message}
			</div>
		{/if}
	</form>
</div>
