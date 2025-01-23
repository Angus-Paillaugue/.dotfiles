import { mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Difficulty from '../Difficulty.svelte';

test('Simple Difficulty component', () => {
	const component = mount(Difficulty, {
		target: document.body,
		props: { difficulty: 'easy' }
	});

	expect(document.body.querySelector('input[type=text]').id).toBe('test');

	unmount(component);
});
