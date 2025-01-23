<script>
	import {
		Card,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Status from '../lib/components/Status.svelte';

	const { services } = $props();
</script>

<h2 class="text-2xl font-semibold mb-4">Services</h2>
<!-- For each service within a category -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
	{#each services as card}
		<Card>
			<CardHeader>
				<div class="flex flex-row items-center gap-4">
					<img src={card.icon} alt="{card.name} icon" class="size-10 object-cover" />
					<CardTitle>{card.name}</CardTitle>
					<Status isUp={card.isUp} class="ml-auto" />
				</div>
				<CardDescription>{card.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<div class="flex flex-row gap-4">
					<!-- If the card.url is an object where the key is the name (ec: Global, Local, ...) and the value is the url of the ressource -->
					{#if card.url instanceof Object}
						{#each Object.entries(card.url) as [name, url], linkIndex}
							<Button
								variant={linkIndex === 0 ? undefined : 'secondary'}
								href={url}
								aria-label="Open {name.toLowerCase()} url for the {card.name} interface"
								target="_blank"
								rel="noopener noreferrer">{name}</Button
							>
						{/each}
						<!-- Else, it means that car.url is a simple string of the url of the ressource -->
					{:else}
						<Button
							color="primary"
							href={card.url}
							target="_blank"
							aria-label="Open global url for the {card.name} interface"
							rel="noopener noreferrer">Global</Button
						>
					{/if}
				</div>
			</CardFooter>
		</Card>
	{/each}
</div>
