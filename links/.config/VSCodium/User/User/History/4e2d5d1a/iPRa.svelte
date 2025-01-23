<script>
	import { cn } from '$lib/utils';

	let { class: className, type = 'text', tag="input", id, label, value = $bindable(), ...restProps } = $props();
	const baseClasses =
		'text-base font-medium md:font-semibold w-full rounded-xl bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-400';
</script>

<div class="flex w-full flex-col gap-1">
	{#if label}
		<label for={id} class="block text-sm font-medium text-neutral-100">{label}</label>
	{/if}
	{#if tag === 'input'}
		<input class={cn(baseClasses, className)} {type} name={id} {id} bind:value {...restProps} />
	{:else if tag === 'textarea'}
		<textarea class={cn(baseClasses, className)} name={id} {id} bind:value {...restProps}>
		</textarea>
	{:else}
		<p>
			Invalid tag: {tag}
		</p>
	{/if}
</div>
