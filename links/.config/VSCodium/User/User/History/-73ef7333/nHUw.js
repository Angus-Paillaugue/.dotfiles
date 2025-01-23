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
		props: { id: 'inputWithLabel', label: 'Label' }
	});

	expect(document.body.querySelector('input[type=text]').id).toBe('inputWithLabel');
	const label = document.body.querySelector('label');
	expect(label.getAttribute('for')).toBe('inputWithLabel');
	expect(label.textContent).toBe('Label');

	unmount(component);
});
