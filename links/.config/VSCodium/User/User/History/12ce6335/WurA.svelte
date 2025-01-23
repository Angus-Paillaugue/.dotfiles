<script>
	import { enhance, applyAction } from '$app/forms';
	import { pb } from '$lib/db';
	import { SEO, Input, Card, Button } from '$lib/components';
	import { toast } from '$lib/components/Toast';

	let { form } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Log In" description="" />

<div class="flex flex-col items-center justify-center grow">
	<Card class="max-w-lg w-full mx-auto">
		<form
			use:enhance={() => {
                isLoading = true;
                return async ({ result }) => {
                    try {
                        // Removes the default behavior of the form being reset after submission
                        pb.authStore.loadFromCookie(document.cookie);
                        await applyAction(result);
                    } catch (error) {
                        console.error('Error during form submission:', error);
                        toast.error({ message: 'An error occurred during form submission.' });
                    } finally {
                        isLoading = false;
                    }
                };
            }}
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
		>
			<h1>Log-in</h1>
			<Input id="email" label="E-mail" />
			<Input type="password" id="password" label="Password" />
			<Button type="submit" loading={isLoading}>Log-in</Button>

			<Button variant="link" href="/forgot-password">
				Forgot password?
			</Button>
			<Button variant="link" href="/sign-up">
				Don't have an account?
			</Button>
		</form>
	</Card>
</div>
