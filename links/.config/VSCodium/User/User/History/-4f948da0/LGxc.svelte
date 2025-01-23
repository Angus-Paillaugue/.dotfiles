<script>
	import { enhance } from '$app/forms';
	import { Input, Button, SEO } from '$lib/components';
	import { toast } from '$lib/components/Toast';

	const { form } = $props();

	let isSendingForm = $state(false);

	$effect(() => {
		if (form?.error) toast.error({ message: form.error });
	});
</script>

<SEO title="sign-up" description="" />


<form
	class="flex w-full flex-col gap-6 max-w-screen-md mx-auto rounded-xl bg-neutral-50 p-6 text-neutral-900"
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
	<h1 class="text-3xl font-bold text-inherit">Sign up</h1>
	<Input
		id="signUpUsername"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		placeholder="Username"
	/>
	<Input
		id="signUpPassword"
		class="bg-neutral-200 text-neutral-800 placeholder:text-neutral-600"
		type="password"
		placeholder="Password"
	/>

	<Button
		disabled={isSendingForm}
		type="submit"
		loading={isSendingForm}
	>
		Sign up
	</Button>
</form>
