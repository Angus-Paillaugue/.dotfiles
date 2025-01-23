<script>
	import { enhance, applyAction } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import { seo } from '$lib/stores';
	import { pb } from '$lib/db';
	import { toast } from '$lib/toast';

	let { form = $bindable() } = $props();

	let isLoading = $state(false);

	$seo.title = 'pageTitles.logIn';
	$seo.description = 'pageDescriptions.logIn';

	run(() => {
		if (form?.message) {
			toast.push(form?.text === 'raw' ? form?.message : $_(form?.message), {
				type: form?.success ? 'success' : 'error'
			});
			form = null;
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>{$_('pageTitles.logIn')}</title>
</svelte:head>

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
			<Input type="email" name="email" placeholder={$_('labels.emailLabel')} width="100%">
				<Text type="small" color="secondary">{$_('labels.emailLabel')}</Text>
			</Input>
			<Spacer h={5} />
			<Input type="password" name="password" placeholder={$_('labels.password')} width="100%">
				<Text type="small" color="secondary">{$_('labels.password')}</Text>
			</Input>
			<Spacer h={15} />
			<Button type="submit" width="100%" loading={isLoading}>{$_('logIn.logIn')}</Button>
			<Spacer h={20} />
			<Text type="small">
				<Link to="/forgot-password">{$_('logIn.forgotPassword')}</Link>
			</Text>
			<Spacer h={10} />
			<Text type="small">
				<Link to="/sign-in">{$_('logIn.noAccount')}</Link>
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
