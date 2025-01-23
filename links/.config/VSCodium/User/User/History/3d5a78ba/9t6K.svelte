

<script>
	import { enhance, applyAction } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { pb } from '$lib/db';
	import { toast } from '$lib/toast';
	import { SEO, Input, Card } from '$lib/components';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Log In" description="" />

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
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
		>
			<Input id="username" label="E-mail" />
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
<script>
	import { run } from 'svelte/legacy';

	import { Button, Divider, Input, Link, Spacer, Text, Center } from 'geist-ui-svelte';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/db';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';
	import { toast } from '$lib/toast';
	import { goto } from '$app/navigation';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$seo.title = 'pageTitles.signIn';
	$seo.description = 'pageDescriptions.signIn';
	run(() => {
		if (form?.message) {
			toast.push(form?.text === 'raw' ? form?.message : $_(form?.message), {
				type: form?.success ? 'success' : 'error'
			});
			if (form?.success) goto('/log-in');
			form = null;
			isLoading = false;
		}
	});
</script>

<!-- 56px => navbar && 96px => footer -->
<div class="flex flex-col items-center justify-center h-[calc(100vh-56px-96px)]">
	<div
		class="flex justify-between border-transparent sm:border-gray-100
        sm:dark:border-gray-900 py-6 sm:border w-full min-h-96 px-8 rounded-xl md:rounded-3xl mx-auto"
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
			action="?/signin"
			method="POST"
			class="flex-grow w-full flex flex-col place-items-start justify-center"
		>
			<Input type="email" name="email" placeholder={$_('labels.emailLabel')} width="100%">
				<Text type="small" color="secondary">{$_('labels.emailLabel')}</Text>
			</Input>
			<Spacer h={5} />
			<Input type="text" name="username" placeholder={$_('labels.username')} width="100%">
				<Text type="small" color="secondary">{$_('labels.username')}</Text>
			</Input>
			<Spacer h={5} />
			<Input type="password" name="password" placeholder={$_('labels.password')} width="100%">
				<Text type="small" color="secondary">{$_('labels.password')}</Text>
			</Input>
			<Spacer h={15} />
			<Button type="submit" width="100%" loading={isLoading} disabled={form?.success}
				>{$_('signIn.create')}</Button
			>
			<Spacer h={20} />
			<Text type="small">
				<Link to="/log-in">{$_('signIn.alreadyHaveAccount')}</Link>
			</Text>
		</form>
		<div class="md:flex w-full flex-grow hidden">
			<Spacer w={75} />
			<Divider vertical width="1px" />
			<Spacer w={75} />
			<Center class="flex-grow w-full flex flex-col gap-2">
				<Text type="h1" align="center" size="2xl" lgSize="3xl">{$_('signIn.createAccount')}</Text>
			</Center>
		</div>
	</div>
</div>


<script>
	import { enhance, applyAction } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { pb } from '$lib/db';
	import { toast } from '$lib/toast';
	import { SEO, Input, Card } from '$lib/components';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Log In" description="" />

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
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
		>
			<Input id="username" label="E-mail" />
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
