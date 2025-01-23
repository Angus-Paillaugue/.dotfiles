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

	// Remove the component from the DOM
	unmount(component);
});
