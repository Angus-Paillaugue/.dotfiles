<script>
	import { Editor, Spinner, Difficulty, Tooltip } from '$lib/components';
	import { cn, formatDate } from '$lib/utils';
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import JSConfetti from 'js-confetti';

	const { exercise } = $props();

	const jsConfetti = new JSConfetti();
	let value = $state(exercise?.submission || exercise.content);
	let isRunning = $state(false);
	let selectedTestIndex = $state(0);
	let latestRunnedTestsResults = $state(null);
	let isSubmitting = $state(false);
	let editor = $state();
	let error = $state(null);
	let leftPaneActiveIndex = $state(0);
	let submissions = $state(exercise.submissions);
	let editorFullScreen = $state(false);
	let mobileActiveTabIndex = $state(0)

	onMount(async () => {
		window.addEventListener('keydown', handleShortcut);
	});

	/**
	 * Handles keyboard shortcuts for the exercise page.
	 *
	 * @param {Event} event - The keyboard event triggered by the user.
	 */
	function handleShortcut(event) {
		if (event.ctrlKey && event.key === 'Enter') {
			runCode();
		}
	}

	/**
	 * Makes a request to the server to run the tests of the current exercise.
	 *
	 * @async
	 * @function runCode
	 */
	async function runCode() {
		error = false;
		isRunning = true;
		const res = await fetch('/api/runTests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				exercise_id: exercise.exercise_id,
				user_input: value
			})
		});
		const data = await res.json();

		latestRunnedTestsResults = data;
		editor.resetEditorLayout();

		isRunning = false;
	}
</script>

<!-- Main code editor -->
<div class={cn('flex flex-col', editorFullScreen && 'fixed inset-2')}>
  <!-- Full screen button -->
  <div
    class="flex flex-row items-center p-2 gap-2 h-10 rounded-t-xl bg-neutral-700"
  >
    <div class="flex flex-row items-center px-2 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-5"
        ><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
      >
      Code
    </div>
  </div>
</div>
<Editor
  language="javascript"
  defaultValue={exercise.content}
  bind:value
  bind:this={editor}
  onRunCodeShortcut={runCode}
/>
