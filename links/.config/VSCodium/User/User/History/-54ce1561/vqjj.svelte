<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import {
		Check,
		AlignLeft,
		RotateCcw,
		Plus,
		Minus,
		WrapText,
		Save,
		AlignJustify
	} from 'lucide-svelte';
	 import { LoaderCircle } from 'lucide-svelte';

	let {
		value = $bindable(''),
		saveId,
		language = 'SQL',
	} = $props();

	let editorElement = $state();
	let editor = $state();
	let monaco = $state();
	let loaded = $state(false);
	let formatted = $state(false);
	let fontSize = $state(16);
	let wordWrap = $state(true);
	let saved = $state(false);

	/**
	 * Loads the provided code into the editor.
	 *
	 * @param {string} code - The code to be loaded into the editor.
	 * @param {string} [lang=language] - The programming language of the code. Defaults to the current language setting.
	 */
	export function loadCode(code, lang = language) {
		// Dispose of any existing models
		monaco?.editor.getModels().forEach((model) => model.dispose());
		// Create a new model
		const model = monaco.editor.createModel(code, lang);
		editor.setModel(model);
	}

	/**
	 * Resizes the editor.
	 */
	export const resetEditorLayout = () => {
		editor.layout({ width: 0, height: 0 });

		window.requestAnimationFrame(() => {
			const rect = editorElement.getBoundingClientRect();

			editor.layout({ width: rect.width, height: rect.height });
		});
	};

	/**
	 * Formats the code in the editor.
	 */
	export const formatCode = () => {
		editor.getAction('editor.action.formatDocument').run();
		formatted = true;
		setTimeout(() => {
			formatted = false;
		}, 1500);
	};

	/**
	 * Saves the current value being edited.
	 * This function is typically called when the user attempts to save their changes.
	 */
	function saveTryValue() {
		if (saved) return;
		localStorage.setItem(saveId, value);
		saved = true;
		setTimeout(() => {
			saved = false;
		}, 1500);
	}

	/**
	 * Retrieves the value from the last attempt or try.
	 * This function is used to fetch and return the value that was last attempted.
	 *
	 * @returns {any} The value from the last try.
	 */
	function getLastTryValue() {
		return localStorage.getItem(saveId);
	}

	onMount(async () => {
		loaded = true;
		monaco = (await import('./monaco')).default;

		const localStorageFontSize = localStorage.getItem('font-size');
		if (localStorageFontSize) fontSize = parseInt(localStorageFontSize);

		// If the user has saved, set the last save value to the editor value
		if (getLastTryValue()) {
			value = getLastTryValue();
		}
		// Create the editor
		editor = monaco.editor.create(editorElement, {
			theme: 'customTheme',
			language,
			value,
			lineNumbers: 'on',
			roundedSelection: true,
			scrollBeyondLastLine: false,
			readOnly: false,
			editor,
			automaticLayout: true,
			autoIndent: true,
			formatOnPaste: true,
			formatOnType: true,
			fontSize,
			fontFamily: 'JetBrains Mono',
			fontLigatures: true,
			wordWrap,
			minimap: { enabled: false }
		});

		window.onresize = () => {
			resetEditorLayout();
		};

		// Responsible for updating the value when the editor content changes
		editor.onDidChangeModelContent(() => {
			value = editor.getValue();
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div class="flex h-full grow flex-col overflow-hidden">
	<div class="relative h-full grow overflow-hidden rounded-b-xl bg-card pt-2">
		{#if loaded}
			<div class="h-full" bind:this={editorElement}></div>
		{:else}
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<LoaderCircle class="animate-spin" />
			</div>
		{/if}
	</div>
</div>
