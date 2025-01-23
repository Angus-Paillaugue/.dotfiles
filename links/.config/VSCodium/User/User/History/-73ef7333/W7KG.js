import { flushSync, mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Input from '../Input.svelte';

test('Input', () => {
	// Instantiate the component using Svelte's `mount` API
	const component = mount(Input, {
		target: document.body, // `document` exists because of jsdom
		props: { id: 'test' }
	});

	expect(document.body.querySelector('input[type=text]').id).toBe('test');

	// Click the button, then flush the changes so you can synchronously write expectations
	document.body.querySelector('button').click();
	flushSync();

	expect(document.body.innerHTML).toBe('<button>1</button>');

	// Remove the component from the DOM
	unmount(component);
});
