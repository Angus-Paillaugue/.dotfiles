<script>
	import { spring } from 'svelte/motion';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	let isSidebarShown = $state(false);
	let sidebarIndicator = spring(
		{ y: 0, width: 0 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const activeSectionLink = document.querySelector(`a[href="#${entry.target.id}"]`);
					if (!activeSectionLink) return;
					// Add text-black class to active link
					activeSectionLink.classList.add('text-black');
					activeSectionLink.classList.remove('text-neutral-200');
					// Remove text-black class from other links
					document.querySelectorAll('a').forEach((link) => {
						if (link !== activeSectionLink) link.classList.remove('text-black');
					});
					// Update sidebar indicator position
					sidebarIndicator.set({
						y: activeSectionLink.offsetTop,
						width: activeSectionLink.clientWidth + 16
					});
				});
			},
			{ threshold: 0.3 }
		);

		document.querySelectorAll('section').forEach((section) => {
			observer.observe(section);
		});
	});
</script>

<div class="w-screen h-screen bg-blue-600">
	<div class="max-w-[2000px] h-full w-full mx-auto flex flex-row p-4 md:p-6 lg:p-8 gap-8">
		<!-- Sidebar -->
		<aside
			class={cn(
				'shrink-0 flex flex-col justify-between text-neutral-300 max-lg:fixed max-lg:top-0 max-lg:bottom-0 bg-blue-600 max-lg:p-6 max-lg:left-0 max-lg:w-4/5 transition-transform z-30 duration-500',
				!isSidebarShown && 'max-lg:-translate-x-full'
			)}
		>
			<div>
				<h1 class="font-semibold text-xl">Angus Paillaugue</h1>
				<h2 class="font-base text-lg">Web Developer</h2>
			</div>

			<!-- TOC -->
			<nav class="flex flex-col gap-2 relative h-fit font-medium">
				<a href="#home" class="text-neutral-200 w-fit transition-colors cursor-pointer">Home</a>
				<a href="#about" class="text-neutral-200 w-fit transition-colors cursor-pointer">About</a>
				<a href="#projects" class="text-neutral-200 w-fit transition-colors cursor-pointer"
					>Projects</a
				>
				<a href="#contact" class="text-neutral-200 w-fit transition-colors cursor-pointer"
					>Contact</a
				>
				<!-- Scroll indicator -->
				<span
					class="absolute -left-2 bg-white h-6 rounded-full -z-10"
					style="top: {$sidebarIndicator.y}px; width: {$sidebarIndicator.width}px;"
				></span>
			</nav>
			<footer></footer>
		</aside>
		<!-- Open sidebar button -->
		<button
			onclick={() => (isSidebarShown = !isSidebarShown)}
			class={cn(
				'fixed top-4 left-4 md:top-6 md:left-6 z-40 bg-transparent rounded-2xl p-2 lg:hidden transition-all duration-500',
				isSidebarShown && '!left-[80%] -ml-14 bg-white'
			)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24">
				<g
					fill="none"
					stroke="currentColor"
					stroke-dasharray="16"
					stroke-dashoffset="16"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
				>
					<path d="M5 5h14">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
					</path>
					<path d="M5 12h14">
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.2s"
							dur="0.2s"
							values="16;0"
						/>
					</path>
					<path d="M5 19h14">
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.4s"
							dur="0.2s"
							values="16;0"
						/>
					</path>
				</g>
			</svg>
		</button>
		<main class="grow rounded-2xl bg-white h-full w-full overflow-y-auto text-black no-scrollbar">
			<!-- Hero -->
			<section id="home" class="bg-blue-50">
				<div
					class="max-w-screen-xl mx-auto px-2 md:px-8 lg:px-12 pt-32 pb-20 sm:pb-30 sm:pt-[160px] md:pt-[200px] md:pb-[100px] lg:pt-[280px] lg:pb-[200px] flex flex-col gap-20 min-h-[400px] items-center"
				>
					<h1 class="group/heading lg:w-[80%]">
						Hi, I'm Angus <svg
							xmlns="http://www.w3.org/2000/svg"
							class="inline size-10 rotate-0 transition-transform group-hover/heading:rotate-[36deg] group-hover/heading:scale-125 duration-500 ease-back-out"
							viewBox="0 0 128 128"
						>
							<radialGradient
								id="notoGrinningFace0"
								cx="63.22"
								cy="216.9"
								r="56.96"
								gradientTransform="translate(0 -154)"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset=".5" stop-color="#fde030" />
								<stop offset=".92" stop-color="#f7c02b" />
								<stop offset="1" stop-color="#f4a223" />
							</radialGradient>
							<path
								fill="url(#notoGrinningFace0)"
								d="M63.22 118.8c-27.9 0-58-17.5-58-55.9S35.32 7 63.22 7c15.5 0 29.8 5.1 40.4 14.4c11.5 10.2 17.6 24.6 17.6 41.5s-6.1 31.2-17.6 41.4c-10.62 9.3-25 14.5-40.4 14.5"
							/>
							<path
								fill="#422b0d"
								d="M44 40.94c-4.19 0-8 3.54-8 9.42s3.81 9.41 8 9.41c4.2 0 8-3.54 8-9.41s-3.76-9.42-8-9.42"
							/>
							<path
								fill="#896024"
								d="M43.65 44.87a2.874 2.874 0 0 0-3.82 1.34c-.53 1.11-.29 2.44.6 3.3c1.42.68 3.13.08 3.82-1.34c.53-1.11.29-2.44-.6-3.3"
							/>
							<path
								fill="#422b0d"
								d="M82.4 40.94c-4.19 0-8 3.54-8 9.42s3.81 9.41 8 9.41s8-3.54 8-9.41s-3.81-9.42-8-9.42"
							/>
							<path
								fill="#896024"
								d="M82 44.87a2.874 2.874 0 0 0-3.82 1.34c-.53 1.11-.29 2.44.6 3.3c1.42.68 3.13.08 3.82-1.34c.53-1.11.29-2.44-.6-3.3"
							/>
							<path
								fill="#eb8f00"
								d="M111.49 29.67c5.33 8.6 8.11 18.84 8.11 30.23c0 16.9-6.1 31.2-17.6 41.4c-10.6 9.3-25 14.5-40.4 14.5c-18.06 0-37-7.35-48.18-22.94c10.76 17.66 31 25.94 50.18 25.94c15.4 0 29.8-5.2 40.4-14.5c11.5-10.2 17.6-24.5 17.6-41.4c0-12.74-3.47-24.06-10.11-33.23"
							/>
							<path
								fill="#422b0d"
								d="M102.07 71.62A5.81 5.81 0 0 0 94.93 69a111 111 0 0 1-31.59 4.43A111 111 0 0 1 31.75 69a5.8 5.8 0 0 0-7.13 2.6c-1.36 2.51-.38 5.42.77 7.93c6.42 14.1 20.57 22.54 37.87 22.59h.16c17.3 0 31.45-8.49 37.88-22.59c1.14-2.53 2.13-5.4.77-7.91"
							/>
							<path
								fill="#ed7770"
								d="M79.35 98.14c-.37-.34-.75-.65-1.13-1a21.74 21.74 0 0 0-14.8-5.41C57.82 91.64 52.37 93.5 48 97c-.38.31-.78.61-1.15 1s-.57.67-.81 1c5.5 2.15 11.36 3.25 17.27 3.22h.16c5.66 0 11.27-1.01 16.57-3q-.3-.57-.69-1.08"
							/>
							<path
								fill="#fff"
								d="M94.93 69a111 111 0 0 1-31.59 4.43A111 111 0 0 1 31.75 69a5.8 5.8 0 0 0-7.13 2.6c-.2.38-.36.78-.46 1.19c.33.17.71.34 1.16.52a84.4 84.4 0 0 0 38.81 8.93c12.91.15 25.67-2.66 37.33-8.2c.47-.2.86-.39 1.21-.57c-.08-.65-.29-1.29-.6-1.87a5.8 5.8 0 0 0-7.14-2.6"
							/>
							<path
								fill="#eb8f00"
								d="M102.11 71.63A5.88 5.88 0 0 0 94.92 69c-10.26 2.99-20.9 4.48-31.58 4.43A111 111 0 0 1 31.75 69a5.8 5.8 0 0 0-7.13 2.6c-1.36 2.51-.38 5.42.77 7.93c.51 1.13 1.08 2.24 1.71 3.31c0 0-2.1-7.78-.28-10.04a3.55 3.55 0 0 1 2.8-1.62c.47 0 .93.08 1.38.22c10.44 3.07 21.27 4.62 32.16 4.6h.35c10.89.02 21.72-1.53 32.16-4.6c.45-.14.91-.22 1.38-.22c1.14.06 2.19.66 2.81 1.62c1.85 2.26-.28 10.07-.28 10.07c.62-1.07 1.24-2.17 1.76-3.31c1.14-2.51 2.13-5.41.77-7.93"
							/>
						</svg>
						- A fullstack web developer living in Toulouse.
					</h1>
					<p class="text-lg ml-auto lg:w-[50%]">
						This personal website is my own little space on the internet where I want to share my
						work, interests and passions with others, without having to please the algorithms of
						social media platforms or follow any other rules. I hope you enjoy exploring my digital
						living room as much as I enjoyed creating it.
					</p>
				</div>
			</section>

			<hr />

			<section class="max-w-screen-xl mx-auto p-2 lg:p-4" id="about">
				<h1>About</h1>
			</section>
			<section id="projects">
				<div class="max-w-screen-xl mx-auto p-2 lg:p-4">
					<h1>Projects</h1>
				</div>

				<div class="grid grid-rows-1 grid-cols-[repeat(auto-fit,minmax(400px,_1fr))] w-[calc(5*400px)] overflow-y-auto max-w-screen-xl mx-auto">
					<div class="aspect-square group rounded-xl bg-blue-600 relative flex flex-col">
						<div class="ml-auto span text-white bg-white/50 px-2 py-1 rounded-full">2024</div>
					</div>
					<div class="aspect-square group rounded-xl bg-blue-600 relative flex flex-col">
						<div class="ml-auto span text-white bg-white/50 px-2 py-1 rounded-full">2024</div>
					</div>
					<div class="aspect-square group rounded-xl bg-blue-600 relative flex flex-col">
						<div class="ml-auto span text-white bg-white/50 px-2 py-1 rounded-full">2024</div>
					</div>
					<div class="aspect-square group rounded-xl bg-blue-600 relative flex flex-col">
						<div class="ml-auto span text-white bg-white/50 px-2 py-1 rounded-full">2024</div>
					</div>
					<div class="aspect-square group rounded-xl bg-blue-600 relative flex flex-col">
						<div class="ml-auto span text-white bg-white/50 px-2 py-1 rounded-full">2024</div>
					</div>
				</div>
			</section>
			<section class="max-w-screen-xl mx-auto p-2 lg:p-4" id="contact">
				<h1>Contact</h1>
			</section>
		</main>
	</div>
</div>
