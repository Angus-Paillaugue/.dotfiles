<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { API_URL } from "$lib/constants";

	let username: string = $state("");
	let password: string = $state("");

	async function register() {
		const res = await fetch(API_URL+"/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (res.ok) {
			const data = await res.json();
			console.log(data);
		} else {
			console.error("Failed to sign up");
		}
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form action="?/register" use:enhance class="grid gap-4">
			<div class="grid gap-2">
				<Label for="username">Email</Label>
				<Input id="username" type="username" placeholder="Your username" bind:value={username} required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type="password" required bind:value={password} />
			</div>
			<Button type="submit" onclick={register} class="w-full">Login</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/log-in" class="underline"> Log in </a>
		</div>
	</Card.Content>
</Card.Root>
