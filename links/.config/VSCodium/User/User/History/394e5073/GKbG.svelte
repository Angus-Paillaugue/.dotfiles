<script>
	import { LoaderCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	const { form } = $props();
	let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="pt-10 flex flex-col items-center justify-center p-2">
	<div class="max-w-md w-full">
		<h1>Log-in</h1>
		<form
			class="flex flex-col gap-6"
			method="POST"
			use:enhance={() => {
				isSendingForm = true;
				return async ({ update }) => {
					await update();
					isSendingForm = false;
				};
			}}
		>
			<div class="flex w-full flex-col gap-1.5">
				<label for="username">Username</label>
				<input type="text" class="px-2 bg-neutral-950 py-1 text-lg border border-main-dark rounded-xl" name="username" placeholder="username" />
			</div>
			<div class="flex w-full flex-col gap-1.5">
				<label for="password">Password</label>
				<input type="password" class="px-2 bg-neutral-950 py-1 text-lg border border-main-dark rounded-xl" name="password" placeholder="password" />
			</div>

			<button disabled={isSendingForm} type="submit" class="flex flex-row items-center justify-center gap-2 w-full px-4 py-4 bg-primary-400 rounded-full text-neutral-100">
				{#if isSendingForm}
					<LoaderCircle class="size-4 animate-spin" />
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
</div>
