import { mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Input from '../Input.svelte';

test('Simple input', () => {
	const component = mount(Input, {
		target: document.body,
		props: { id: 'test' }
	});

	expect(document.body.querySelector('input[type=text]').id).toBe('test');

	unmount(component);
});

test('Input with label', () => {
	const component = mount(Input, {
		target: document.body,
		props: { id: 'inputWithLabel' }
	});

	expect(document.body.querySelector('input[type=text]').id).toBe('inputWithLabel');
	expect(document.body.querySelector('label').for).toBe('inputWithLabel');

	unmount(component);
});
