<script>
	import { enhance, applyAction } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { pb } from '$lib/db';
	import { toast } from '$lib/toast';
	import { SEO, Input } from '$lib/components';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Log In" description="" />

<!-- 56px => navbar && 96px => footer -->
<div class="flex flex-col items-center justify-center h-[calc(100vh-56px-96px)]">
	<div
		class="flex justify-between border-transparent sm:border-gray-100
        sm:dark:border-gray-900 py-6 sm:border w-full h-96 px-8 rounded-xl md:rounded-3xl mx-auto"
	>
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
			action="?/login"
			method="POST"
			class="flex-grow w-full flex flex-col place-items-start justify-center"
		>
			<Input id="username" label="E-mail" />
			<Input type="password" id="password" label="Password" />
			<Button type="submit" loading={isLoading}>Log-in</Button>

			<Button variant="link" href="/forgot-password">
				Forgot password?
			</Button>
			<Button variant="link" href="/sign-up">
				Don't have an account?
			</Button>"/sign-in">{$_('logIn.noAccount')}</Link>
			</Text>
		</form>
		<div class="md:flex w-full flex-grow hidden">
			<Spacer w={75} />
			<Divider vertical width="1px" />
			<Spacer w={75} />
			<Center class="flex-grow w-full flex flex-col gap-2">
				<Text type="h1" align="center" size="2xl" lgSize="3xl">{$_('logIn.logIn')}</Text>
			</Center>
		</div>
	</div>
</div>
