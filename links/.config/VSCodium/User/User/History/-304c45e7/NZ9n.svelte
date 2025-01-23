<script>
	import { LoaderCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	const { form } = $props();
	let isSendingForm = $state(false);
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="pt-10 flex flex-col items-center justify-center h-screen p-2">
	<form
		class="p-4 border max-w-md mb-8 gap-6 flex flex-col rounded-xl w-full"
		method="POST"
		use:enhance={() => {
			isSendingForm = true;
			return async ({ update }) => {
				await update();
				isSendingForm = false;
			};
		}}
	>
		<h1>Sign-in</h1>
		<div class="flex w-full flex-col gap-1.5">
			<label for="email">Email</label>
			<input type="email" name="email" placeholder="email" />
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<label for="username">Username</label>
			<input type="text" name="username" placeholder="username" />
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<label for="password">Password</label>
			<input type="password" name="password" placeholder="password" />
		</div>

		<button variant="primary" disabled={isSendingForm} type="submit" class="button">
			{#if isSendingForm}
				<LoaderCircle class="size-4 animate-spin" />
			{/if}
			Sign-in
		</button>

		<a href="/log-in" class="link">Already an account?</a>

		{#if form?.success == false}
			<div class="alert" role="alert">{form.message}</div>
		{/if}
	</form>
</div>
