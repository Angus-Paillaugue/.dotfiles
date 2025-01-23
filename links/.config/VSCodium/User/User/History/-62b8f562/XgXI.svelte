<script>
	import Projects from './Projects.svelte';
</script>

<!-- Hero -->
<section id="home" class="bg-primary/10">
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
	<!-- TODO : make this section -->
</section>

<hr />

<Projects />

<hr />

<section class="bg-primary/10 pb-32 group/section" id="contact">
	<div class="max-w-screen-xl mx-auto px-2 md:px-8 lg:px-12 pt-32 pb-20 sm:pb-30 sm:pt-[160px] md:pt-[200px] md:pb-[100px] flex flex-col lg:flex-row gap-20">
		<div class="flex flex-col max-lg:items-center">
			<h1>Contact</h1>
			<!-- TODO : Fix animation -->
			<svg xmlns="http://www.w3.org/2000/svg" class="size-20 transition-transform rotate-[-16deg] group-hover/section:rotate-[26deg]" viewBox="0 0 128 128">
				<g fill="#ffca28">
					<path d="M19.8 63.23c1.13-9.15 3.78-28.62 4.62-31.97c.85-3.39 2.42-6.82 6.42-7.08c4.49-.29 5.62 3.46 5.33 8.15L33.35 59.5c1.14-.19 1.09-.61 2.35-.8c-.09-.6-.07-1.23.01-1.83c0 0 1.8-29.99 2.54-35.23c.15-1.08 1.37-8.2 6.62-8.54c4.06-.26 6.23 1.32 6.33 6.28l-.78 38.04c.81-.05 1.62-.1 2.42-.14c-.26-1.64-.64-26.96.18-40.04c.17-2.73.5-4.9.68-6.26c.6-4.36 2.92-7 6.08-7c4 0 6.25.9 6.81 7.05c.66 7.24 1.45 44.39 1.1 44.41c.1.67.12 1.39 0 2.07c.91.02 1.79.04 2.64.07c0 0-2.02-34.17-1.7-38.09c.31-3.92 2.25-6.04 5.59-6.34c3.67-.33 6.51.83 7.56 6.91c2.52 14.59 5.71 58.88 5.97 59.92c.26 1.05-.76 1.38.15 1.66c1.48.46-4.86 42.26-31.08 42.26c-17.46 0-29.02-10.09-33.98-21.77c-6.22-14.65-4.31-28.65-3.04-38.9" />
					<path d="M101.53 58.81C91.15 65.79 88.27 78.2 88.27 78.2s-.24-3.08-.63-7.81c-9.85 18.49-22.17 41.64-28.52 53.58c13.67-.29 28.2-5.37 42.08-33.8c6.07-12.43 10.15-19.49 12.94-23.19c4.55-6.04-2.96-14.67-12.61-8.17" />
				</g>
				<g fill="#eda600">
					<path d="M68.3 12.75c.24 3.61 2.09 42.57 2.41 44.86c.25 1.79 1.92 3.13 1.22 4.68c-.49 1.08-3.28-.47-4.31-1.36c-.97-.83-1.29-1.74-1.29-3.17S65.17 12.3 65.17 12.3c-.03-3.77-1.11-5.81-2.29-6.93c-.39-.37 0-.92.53-.8c2.42.56 4.5 2.41 4.89 8.18m-18.26 8.59c-.09 5.26-.5 34.61-.66 35.92s-1.05 2.24.05 3.46c.83.93 2.64.88 3.8.47c1.62-.58.2-3.21.21-5.06c0-1.84-.49-28.59-.56-34.14c-.05-4.38-1.64-6.64-3.52-7.77c-.6-.36-1.25.36-.84.92c.87 1.19 1.57 3.11 1.52 6.2m-12.5 10.3s-.69 28.62-.68 28.71c0 0 .45 2.25-3.22 3.43c-.92.3-2.29.54-2.39-.76c-.05-.73 1.27-2.49 1.35-3.09l2.48-28.95c.07-2.97-.58-3.49-1.95-4.63c-1.4-1.17-.54-1.92-.09-1.86c2.85.4 4.64 3.07 4.5 7.15m19.12 66.58c6.08-19.26 27.98-19.91 27.98-19.91c0 2.43 3.66.15 3.66.15c-1.39 4.59-5.53 4.29-9.86 5.36c-16.35 4.05-19.34 16.08-20.8 20.01c-.41 1.11-.83 2.42-1.19 3.63c-.25.83-1.47.63-1.44-.24c.05-2.13.43-5.13 1.65-9" />
					<path d="M79.86 19.56c2.5 14.15 3.44 47.25 4.24 60.41l4.26-1.3c-.18-1.25-3.02-44.31-5.7-58.2c-.72-3.71-2.33-5.7-4.1-6.65c-.66-.35-1.27.51-.76 1.06c.86.94 1.66 2.4 2.06 4.68m31.05 48.19c-3.44 4.16-6.82 9.53-13.22 21.5c-6.55 12.24-12.26 20.12-19.49 25.08c-3.61 2.48-8.78 6.12-21.21 6.16c-9.02.03-16.27-2.06-20.72-3.79c-.71-.28-1.19.7-.55 1.12c5.43 3.54 12.45 5.83 21.47 6.16c2.49.09 3.61-.06 8.78-.78c6.79-.95 21.73-4.6 35.61-33.04c6.07-12.43 9.68-19.27 12.46-22.97c.85-1.13 1.39-2.48 1.44-3.84c.03-.66-.84-.92-1.17-.35c-.65 1.1-1.72 2.72-3.4 4.75" />
				</g>
			</svg>
		</div>

		<div class="flex flex-col">
			<a href="mailto:angus@paillaugue.fr" target="_blank" class="cursor-pointer border-b border-neutral-300 p-4 grid grid-cols-3 group/link">
				<p class="font-bold font-sans text-neutral-800 max-lg:col-span-2">Email</p>
				<p class="max-lg:col-span-2 max-lg:row-start-2">angus@paillaugue.fr</p>
				<div class="ml-auto max-lg:row-span-2 flex flex-row items-center justify-end">
					<svg xmlns="http://www.w3.org/2000/svg" class="size-6 transition-transform group-hover/link:rotate-45 duration-75" viewBox="0 0 24 24">
					<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7" />
				</svg>
				</div>
			</a>
			<a href="https://www.linkedin.com/in/angus-paillaugue/" target="_blank" class="cursor-pointer p-4 grid grid-cols-3 group/link">
				<p class="font-bold font-sans text-neutral-800 max-lg:col-span-2">LinkedIn</p>
				<p class="max-lg:col-span-2 max-lg:row-start-2">angus.paillaugue40@gmail.com</p>
				<div class="ml-auto max-lg:row-span-2 flex flex-row items-center justify-end">
					<svg xmlns="http://www.w3.org/2000/svg" class="size-6 transition-transform group-hover/link:rotate-45 duration-75" viewBox="0 0 24 24">
					<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7" />
				</svg>
				</div>
			</a>
		</div>
	</div>
</section>
