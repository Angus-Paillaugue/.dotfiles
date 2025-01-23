<script>
	import { page } from '$app/stores';
	const messages = {
		404: "Sorry, but we can't find the page you are looking for...",
		500: 'Internal server error'
	};
</script>

<div class="mx-auto w-full grow p-4 md:max-w-[888px] md:p-6 lg:max-w-screen-xl">
	<div
		class="mt-40 flex w-full flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-[20px]"
	>
		<img class="w-[270px]" src="https://leetcode.com/static/images/404_face.png" alt="{$page.status}" />
		<div class="text-center md:text-left">
			<h1 class="text-neutral-100 text-xl font-bold">{$page.error.message}</h1>
            {#if $page.status in messages}
                <p class="text-neutral-400 mt-2 max-w-[300px] text-sm">
                    {messages[$page.status]}
                </p>
            {/if}
		</div>
	</div>
</div>
