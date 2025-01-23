<script>
	import { enhance, applyAction } from '$app/forms';
	import { pb } from '$lib/db';
	import { SEO, Input, Card, toast, Button } from '$lib/components';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Sign up" description="" />

<div class="flex flex-col items-center justify-center grow">
	<Card class="max-w-screen-md mx-auto">
		<form
			use:enhance={() => {
				isLoading = true;
				form = null;
				return async ({ result }) => {
					// Removes the default behavior of the form being reset after submission
					pb.authStore.loadFromCookie(document.cookie);
					await applyAction(result);

					isLoading = false;
				};
			}}
			action="?/signup"
			method="POST"
			class="flex flex-col gap-4"
		>
			<Input id="email" label="E-mail" />
			<Input type="password" id="password" label="Password" />
			<Button type="submit" loading={isLoading}>Sign-up</Button>

			<Button variant="link" href="/log-in">
				Already have an account?
			</Button>
		</form>
	</Card>
</div>
