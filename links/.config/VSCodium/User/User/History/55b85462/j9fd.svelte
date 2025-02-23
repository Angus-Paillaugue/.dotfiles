<script>
	import { cn, reveal } from '$lib/utils';
	import { contacts } from '$conf';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let tooltipPos = spring({ x: 0, y: 0, opacity:0 }, {
    stiffness: 0.3,
    damping: 0.35,
	});

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});

	function handleMouseMove(e) {
		const links = document.querySelectorAll('#contactLinks a');

		const hovering = Array.from(links).find((link) => {
			const rect = link.getBoundingClientRect();
			return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
		});

		const tooltip = document.getElementById('contactLinksTooltip');
		if (hovering) {
			const rect = hovering.getBoundingClientRect();
			const x = rect.left + rect.width / 2;
			const y = rect.top + rect.height + 10;
			tooltip.style.opacity = 1;
			tooltipPos.set({ x, y, opacity: 1 });
		} else {
			tooltipPos.set({ x:$tooltipPos.x, y:$tooltipPos.y, opacity: 0 });
		}
	}
</script>

<section class="md:p-8 lg:p-12" id="contact">
	<div class="w-full bg-primary/10 group/section md:rounded-xl">
		<div
			class="max-w-screen-xl mx-auto px-2 md:px-8 lg:px-12 py-32 sm:py-[160px] md:py-[200px] flex flex-col xl:flex-row gap-20"
		>
			<div class="flex flex-col max-xl:items-center shrink-0">
				<h1 use:reveal>{$t('home.contact.title')}</h1>
				<!-- Hand -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-20 transition-transform rotate-[-16deg] group-hover/section:rotate-[344deg] duration-500"
					viewBox="0 0 128 128"
					aria-label="Emoji hand image"
					use:reveal
				>
					<g fill="#ffca28">
						<path
							d="M19.8 63.23c1.13-9.15 3.78-28.62 4.62-31.97c.85-3.39 2.42-6.82 6.42-7.08c4.49-.29 5.62 3.46 5.33 8.15L33.35 59.5c1.14-.19 1.09-.61 2.35-.8c-.09-.6-.07-1.23.01-1.83c0 0 1.8-29.99 2.54-35.23c.15-1.08 1.37-8.2 6.62-8.54c4.06-.26 6.23 1.32 6.33 6.28l-.78 38.04c.81-.05 1.62-.1 2.42-.14c-.26-1.64-.64-26.96.18-40.04c.17-2.73.5-4.9.68-6.26c.6-4.36 2.92-7 6.08-7c4 0 6.25.9 6.81 7.05c.66 7.24 1.45 44.39 1.1 44.41c.1.67.12 1.39 0 2.07c.91.02 1.79.04 2.64.07c0 0-2.02-34.17-1.7-38.09c.31-3.92 2.25-6.04 5.59-6.34c3.67-.33 6.51.83 7.56 6.91c2.52 14.59 5.71 58.88 5.97 59.92c.26 1.05-.76 1.38.15 1.66c1.48.46-4.86 42.26-31.08 42.26c-17.46 0-29.02-10.09-33.98-21.77c-6.22-14.65-4.31-28.65-3.04-38.9"
						/>
						<path
							d="M101.53 58.81C91.15 65.79 88.27 78.2 88.27 78.2s-.24-3.08-.63-7.81c-9.85 18.49-22.17 41.64-28.52 53.58c13.67-.29 28.2-5.37 42.08-33.8c6.07-12.43 10.15-19.49 12.94-23.19c4.55-6.04-2.96-14.67-12.61-8.17"
						/>
					</g>
					<g fill="#eda600">
						<path
							d="M68.3 12.75c.24 3.61 2.09 42.57 2.41 44.86c.25 1.79 1.92 3.13 1.22 4.68c-.49 1.08-3.28-.47-4.31-1.36c-.97-.83-1.29-1.74-1.29-3.17S65.17 12.3 65.17 12.3c-.03-3.77-1.11-5.81-2.29-6.93c-.39-.37 0-.92.53-.8c2.42.56 4.5 2.41 4.89 8.18m-18.26 8.59c-.09 5.26-.5 34.61-.66 35.92s-1.05 2.24.05 3.46c.83.93 2.64.88 3.8.47c1.62-.58.2-3.21.21-5.06c0-1.84-.49-28.59-.56-34.14c-.05-4.38-1.64-6.64-3.52-7.77c-.6-.36-1.25.36-.84.92c.87 1.19 1.57 3.11 1.52 6.2m-12.5 10.3s-.69 28.62-.68 28.71c0 0 .45 2.25-3.22 3.43c-.92.3-2.29.54-2.39-.76c-.05-.73 1.27-2.49 1.35-3.09l2.48-28.95c.07-2.97-.58-3.49-1.95-4.63c-1.4-1.17-.54-1.92-.09-1.86c2.85.4 4.64 3.07 4.5 7.15m19.12 66.58c6.08-19.26 27.98-19.91 27.98-19.91c0 2.43 3.66.15 3.66.15c-1.39 4.59-5.53 4.29-9.86 5.36c-16.35 4.05-19.34 16.08-20.8 20.01c-.41 1.11-.83 2.42-1.19 3.63c-.25.83-1.47.63-1.44-.24c.05-2.13.43-5.13 1.65-9"
						/>
						<path
							d="M79.86 19.56c2.5 14.15 3.44 47.25 4.24 60.41l4.26-1.3c-.18-1.25-3.02-44.31-5.7-58.2c-.72-3.71-2.33-5.7-4.1-6.65c-.66-.35-1.27.51-.76 1.06c.86.94 1.66 2.4 2.06 4.68m31.05 48.19c-3.44 4.16-6.82 9.53-13.22 21.5c-6.55 12.24-12.26 20.12-19.49 25.08c-3.61 2.48-8.78 6.12-21.21 6.16c-9.02.03-16.27-2.06-20.72-3.79c-.71-.28-1.19.7-.55 1.12c5.43 3.54 12.45 5.83 21.47 6.16c2.49.09 3.61-.06 8.78-.78c6.79-.95 21.73-4.6 35.61-33.04c6.07-12.43 9.68-19.27 12.46-22.97c.85-1.13 1.39-2.48 1.44-3.84c.03-.66-.84-.92-1.17-.35c-.65 1.1-1.72 2.72-3.4 4.75"
						/>
					</g>
				</svg>
			</div>

			<!-- Links -->
			<div class="flex flex-col grow" id="contactLinks">
				{#each contacts as contact, i}
					<a
						href={contact.link}
						target="_blank"
						class={cn(
							'p-4 grid grid-cols-3 group/link',
							i !== contacts.length && 'border-b border-neutral-300'
						)}
						aria-label={contact.label}
						use:reveal
					>
						<p class="font-bold font-sans text-neutral-800 max-lg:col-span-2">{contact.label}</p>
						<p class="max-lg:col-span-2 max-lg:row-start-2">{contact.value}</p>
						<div class="ml-auto max-lg:row-span-2 flex flex-row items-center justify-end">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-6 transition-transform group-hover/link:rotate-45 group-hofocusver/link:rotate-45"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 7h10v10M7 17L17 7"
								/>
							</svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
{$tooltipPos.opacity}
<div id="contactLinksTooltip" style="opacity: {$tooltipPos.opacity}; left: {$tooltipPos.x}px; top: {$tooltipPos.y}px;" class="p-4 z-50 mb-4 rounded-br-none rounded-xl transition-opacity absolute bg-primary text-white -translate-y-full -translate-x-full">test test</div>
