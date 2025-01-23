<script>
	import { enhance } from '$app/forms';
	import { Input, Button, SEO } from '$lib/components';
	import { toast } from '$lib/components/Toast';
	import { cn } from '$lib/utils';
	import { spring } from 'svelte/motion';


	const { form } = $props();

	let isSendingForm = $state(false);
	let formIndex = $state(0);
	let formIndicatorPos = spring(0, {
		stiffness: 0.05,
		damping: 0.25
	});
	let formPos = $state(0);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="Log-in" description="" />


<form
	class="flex w-full flex-col gap-6 rounded-xl bg-neutral-50 p-6 text-neutral-900"
	method="POST"
	action="?/signUp"
	use:enhance={() => {
		isSendingForm = true;
		return async ({ update }) => {
			await update();
			isSendingForm = false;
		};
	}}
>
	<h1 class="text-3xl font-bold text-inherit">{m.home_page_hero_forms_sign_up_title()}</h1>
	<Input
		id="signUpUsername"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		placeholder={m.home_page_hero_forms_inputs_username()}
		tabindex={formIndex === 0 ? 0 : -1}
	/>
	<Input
		id="signUpPassword"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		type="password"
		placeholder={m.home_page_hero_forms_inputs_password()}
		tabindex={formIndex === 0 ? 0 : -1}
	/>

	<Button
		disabled={isSendingForm}
		type="submit"
		tabindex={formIndex === 0 ? 0 : -1}
		loading={isSendingForm}
	>
		{m.home_page_hero_forms_sign_up_title()}
	</Button>
</form>

<!-- Log in form -->
<form
	class="flex w-full flex-col gap-6 rounded-xl bg-neutral-50 p-6 text-neutral-900"
	method="POST"
	action="?/logIn"
	use:enhance={() => {
		isSendingForm = true;
		return async ({ update }) => {
			await update();
			isSendingForm = false;
		};
	}}
>
	<h1 class="text-3xl font-bold text-inherit">{m.home_page_hero_forms_log_in_title()}</h1>
	<Input
		id="logInUsername"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		placeholder={m.home_page_hero_forms_inputs_username()}
		tabindex={formIndex === 1 ? 0 : -1}
	/>
	<Input
		id="logInPassword"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		type="password"
		placeholder={m.home_page_hero_forms_inputs_password()}
		tabindex={formIndex === 1 ? 0 : -1}
	/>

	<Button
		disabled={isSendingForm}
		tabindex={formIndex === 1 ? 0 : -1}
		type="submit"
		loading={isSendingForm}
	>
		{m.home_page_hero_forms_log_in_title()}
	</Button>
</form>
