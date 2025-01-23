<script>
	import { onDestroy, onMount } from 'svelte';
	import { Tooltip } from '$lib/components';


	let { value = $bindable(''), language = 'javascript', onRunCodeShortcut } = $props();

	let editorElement = $state();
	let editor = $state();
	let monaco = $state();
	let formatted = $state(false);
	const INITIAL_CODE_VALUE = value;

	/**
	 * Retrieves the value of a specified CSS variable.
	 *
	 * @param {string} variable - The name of the CSS variable to retrieve.
	 * @returns {string} The value of the specified CSS variable.
	 */
	function getCSSVariableValue(variable) {
		return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
	}

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
	 * Resets the editor to its initial state.
	 *
	 * @param {string} [lang=language] - The language to reset the editor to. Defaults to the current language.
	 */
	function resetEditor(lang = language) {
		loadCode(INITIAL_CODE_VALUE, lang);
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
	};

	onMount(async () => {
		monaco = (await import('./monaco')).default;

		const backgroundColor = getCSSVariableValue('--tw-neutral-900');

		// Create theme with custom background color
		monaco.editor.defineTheme('customTheme', {
			base: 'vs-dark',
			inherit: true,
			rules: [],
			colors: {
				'editor.background': backgroundColor
			}
		});
		const keyBindings = [
			{
				id: 'run-code-shortcut',
				label: 'Run code',
				keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
				precondition: null,
				keybindingContext: null,
				contextMenuGroupId: 'navigation',
				contextMenuOrder: 1.5,
				run: () => {
					onRunCodeShortcut?.();
				}
			},{
				id: 'formatCode',
				label: 'Format code',
				keybindings: [monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
				precondition: null,
				keybindingContext: null,
				contextMenuGroupId: 'navigation',
				contextMenuOrder: 1.5,
				run: () => {
					formatCode();
				}
			}
		]
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
			"autoIndent": true,
			"formatOnPaste": true,
			"formatOnType": true
		});

		// Adding keybindings to the editor
		for(const keyBinding of keyBindings) {
			editor.addAction(keyBinding)
		}

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

<div class="h-full grow flex flex-col rounded-xl overflow-hidden">
	<div class="flex flex-row p-2 items-center h-10 shrink-0 bg-neutral-800">
		<!-- Format code button -->
		<Tooltip content="Format <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>F</kbd>" position="bottom" delay={100}>
			<button onclick={formatCode} class="flex flex-roe gap-2 items-center" aria-label="Format code" disabled={formatted}>
				{#if formatted}
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg>
				{/if}
			</button>
		</Tooltip>
	</div>
	<div class="h-full grow" bind:this={editorElement}></div>
</div>
