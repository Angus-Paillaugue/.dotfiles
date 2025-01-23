<script>
	import * as Alert from '$lib/components/ui/alert';
	import { Label } from '$lib/components/ui/label';
	import { LoaderCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	const { form } = $props();
	let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="pt-10 flex flex-col items-center justify-center p-2">
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
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="username">Username</Label>
			<input type="text" name="username" placeholder="username" />
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="password">Password</Label>
			<input type="password" name="password" placeholder="password" />
		</div>

		<button disabled={isSendingForm} type="submit" class="flex flex-row items-center gap-2">
			{#if isSendingForm}
				<LoaderCircle class="size-4 animate-spin" />
			{/if}
			Log-in
		</button>

		{#if form?.success == false}
			<div class="alert" role="alert">{form.message}</div>
		{/if}
	</form>
</div>
