<script>
	import { run } from 'svelte/legacy';

	import { _ } from 'svelte-i18n';
	import {
		Spacer,
		Button,
		Label,
		Input,
		Modal,
		Text,
		Divider,
		TextArea,
		ToolTip
	} from 'geist-ui-svelte';
	import { enhance } from '$app/forms';
	import { headerTitle } from '$lib/stores';
	import { seo } from '$lib/stores';
	import { getImageUrl } from '$lib/vetements';
	import { toast } from '$lib/toast';

	let { data, form = $bindable() } = $props();

	const baseUser = $state(data.user);
	const modifiedUser = $state(structuredClone(baseUser));
	let changingEmail = $state(false);
	let changingUsername = $state(false);
	let deleteAccountModal = $state(false);
	let deleteAccountLoading = $state(false);
	let changingBio = $state(false);
	let changingProfilePicture = $state(false);
	let changedProfilePicture = $state(false);
	let changingBanner = $state(false);
	let changedBanner = $state(false);

	/**
	 * Checks if the form submission was successful and updates the UI accordingly.
	 */
	run(() => {
		if (form?.message) {
			if (form?.type === 'emailChange') baseUser.email = modifiedUser.email;
			if (form?.type === 'usernameChange') baseUser.username = modifiedUser.username;
			toast.push(form?.text === 'raw' ? form?.message : $_(form?.message), {
				type: form?.success ? 'success' : 'error'
			});
			form = null;
		}
	});

	$headerTitle = $_('pageTitles.settings');
	$seo.title = 'pageTitles.settings';
	$seo.description = 'pageDescriptions.settings';

	/**
	 * Sanitize the given HTML string by removing any potentially malicious code.
	 *
	 * @param {string} htmlString - The HTML string to sanitize.
	 * @returns {string} - The sanitized HTML string.
	 */
	function sanitizeHTML(htmlString) {
		// Create a temporary div element
		const tempDiv = document.createElement('div');
		// Set the HTML content of the div
		tempDiv.innerHTML = htmlString;

		// Select all elements in the temporary div
		const allElements = tempDiv.querySelectorAll('*');

		// Loop through each element
		allElements.forEach((element) => {
			Array.from(element.attributes).forEach((attribute) => {
				// Remove the attribute from the element
				element.removeAttribute(attribute.name);
			});
		});

		// Return the sanitized HTML content
		return tempDiv.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
	}
</script>

<div class="px-2">
	<Spacer h={10} />

	<!-- Email change -->
	<form
		use:enhance={() => {
			changingEmail = true;
			return async ({ update }) => {
				// Removes the default behavior of the form being reset after submission
				update({ reset: false });

				changingEmail = false;
			};
		}}
		method="POST"
		action="?/changeEmail"
	>
		<Label>{$_('labels.emailLabel')}</Label>
		<Input
			type="email"
			name="email"
			placeholder={$_('labels.emailLabel')}
			autoComplete="off"
			width="100%"
			bind:value={modifiedUser.email}
		></Input>
		<Spacer h={5} />

		<Button disabled={baseUser.email == modifiedUser.email} type="submit" loading={changingEmail}
			>{$_('labels.save')}</Button
		>
	</form>

	<Spacer h={20} />

	<!-- Username change -->
	<form
		use:enhance={() => {
			changingUsername = true;
			return async ({ update }) => {
				// Removes the default behavior of the form being reset after submission
				update({ reset: false });

				changingUsername = false;
			};
		}}
		method="POST"
		action="?/changeUsername"
	>
		<Label>{$_('labels.username')}</Label>
		<Input
			type="text"
			name="username"
			placeholder={$_('labels.username')}
			autoComplete="off"
			width="100%"
			bind:value={modifiedUser.username}
		></Input>
		<Spacer h={5} />

		<Button
			disabled={baseUser.username == modifiedUser.username}
			type="submit"
			loading={changingUsername}>{$_('labels.save')}</Button
		>
	</form>

	<Spacer h={20} />
	<div class="grid grid-cols-2 gap-4">
		<!-- Profile picture change -->
		<form
			use:enhance={() => {
				changingProfilePicture = true;
				return async ({ update }) => {
					// Removes the default behavior of the form being reset after submission
					update({ reset: false });

					changingProfilePicture = false;
					changedProfilePicture = false;
				};
			}}
			method="POST"
			action="?/changeProfilePicture"
			enctype="multipart/form-data"
			class="w-full"
		>
			<Label>{$_('labels.profilePicture')}</Label>
			<div
				class="relative lg:h-36 md:h-24 h-16 aspect-square rounded-full bg-center bg-no-repeat bg-cover my-1 group overflow-hidden"
				style="background-image: url({getImageUrl(
					baseUser.collectionId,
					baseUser.id,
					baseUser.profilePicture
				)});"
			>
				<input
					type="file"
					accept="image/*"
					name="profilePicture"
					id="profilePicture"
					class="hidden"
					onchange={(e) => {
						const url = URL.createObjectURL(e.target.files[0]);
						e.target.parentElement.style.backgroundImage = `url(${url})`;
						changedProfilePicture = true;
						// URL.revokeObjectURL(url);
					}}
				/>
				<label
					for="profilePicture"
					class="opacity-0 transition-all absolute inset-0 flex flex-col items-center justify-center group-hover:opacity-100 text-white dark:bg-gray-950/70 bg-gray-400/70 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
						/>
					</svg>
				</label>
			</div>

			<Spacer h={5} />

			<Button disabled={!changedProfilePicture} type="submit" loading={changingProfilePicture}
				>{$_('labels.save')}</Button
			>
		</form>

		<!-- Banner change -->
		<form
			use:enhance={() => {
				changingBanner = true;
				return async ({ update }) => {
					// Removes the default behavior of the form being reset after submission
					update({ reset: false });

					changingBanner = false;
					changedBanner = false;
				};
			}}
			method="POST"
			action="?/changeBanner"
			enctype="multipart/form-data"
			class="w-full"
		>
			<Label>{$_('labels.banner')}</Label>
			<div
				class="relative w-full rounded-md bg-center bg-no-repeat bg-cover my-1 group overflow-hidden max-h-40"
				style="height: 20vw;background-image: url({getImageUrl(
					baseUser.collectionId,
					baseUser.id,
					baseUser.banner
				) ?? '/defaultBanner.jpg'});"
			>
				<input
					type="file"
					accept="image/*"
					name="banner"
					id="banner"
					class="hidden"
					onchange={(e) => {
						const url = URL.createObjectURL(e.target.files[0]);
						e.target.parentElement.style.backgroundImage = `url(${url})`;
						changedBanner = true;
						// URL.revokeObjectURL(url);
					}}
				/>
				<label
					for="banner"
					class="opacity-0 transition-all absolute inset-0 flex flex-col items-center justify-center group-hover:opacity-100 text-white dark:bg-gray-950/70 bg-gray-400/70 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
						/>
					</svg>
				</label>
			</div>

			<Spacer h={5} />

			<Button disabled={!changedBanner} type="submit" loading={changingBanner}
				>{$_('labels.save')}</Button
			>
		</form>
	</div>

	<Spacer h={20} />
	<Divider />
	<Spacer h={10} />
	<Text type="h3" color="error">Danger zone!</Text>

	<Spacer h={10} />
	<Button color="error" on:click={() => (deleteAccountModal = true)}>
		{$_('settings.deleteAccount')}
	</Button>
</div>

<Modal bind:visible={deleteAccountModal} class="sm:w-[640px] h-fit">
	<form
		use:enhance={() => {
			deleteAccountLoading = true;
			return async ({ update }) => {
				update();

				deleteAccountLoading = false;
			};
		}}
		method="POST"
		action="?/deleteAccount"
		class="p-4 flex flex-col h-full"
	>
		<Text type="h3">{$_('settings.deleteAccount')}</Text>
		<Spacer h={15} />
		<Text>{@html $_('settings.deleteAccountConfirm')}</Text>
		<Spacer h={30} />
		<div class="flex flex-row justify-between items-center mt-auto">
			<Button
				type="button"
				on:click={() => {
					deleteAccountModal = false;
				}}>{$_('labels.cancel')}</Button
			>
			<Button type="submit" color="error" ghost loading={deleteAccountLoading}
				>{$_('labels.delete')}</Button
			>
		</div>
	</form>
</Modal>
