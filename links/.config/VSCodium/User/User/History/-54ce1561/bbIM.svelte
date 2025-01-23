<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	 import { LoaderCircle } from 'lucide-svelte';

	let {
		value = $bindable(''),
		language = 'sql',
	} = $props();

	let editorElement = $state();
	let editor = $state();
	let monaco = $state();
	let loaded = $state(false);

	/**
	 * Loads the provided code into the editor.
	 *
	 * @param {string} code - The code to be loaded into the editor.
	 * @param {string} [lang=language] - The programming language of the code. Defaults to the current language setting.
	 */
	export function loadCode(code: string, lang: string = language) {
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

	onMount(async () => {
		loaded = true;
		monaco = (await import('./monaco')).default;
		// Create the editor
		editor = monaco.editor.create(editorElement, {
			theme: 'visual-studio',
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
			fontSize: 16,
			fontFamily: 'JetBrains Mono',
			fontLigatures: true,
			wordWrap: true,
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

	function updateTheme(theme: string) {
		const availableThemes = ['vs', 'vs-dark'];
		if (!availableThemes.includes(theme)) {
			theme = 'vs';
		}
		if(!editor) return;
		editor?.updateOptions({ theme: theme });
	}
</script>

<div class="relative border border-border rounded-xl flex flex-col grow overflow-hidden">
	{#if loaded}
		<div class="grow" bind:this={editorElement}></div>
	{:else}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<LoaderCircle class="animate-spin" />
		</div>
	{/if}
</div>
