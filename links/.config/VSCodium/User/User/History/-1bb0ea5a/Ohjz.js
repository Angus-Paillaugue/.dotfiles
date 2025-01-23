import { mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Difficulty from '../Difficulty.svelte';

test('Simple Difficulty component', () => {
	const component = mount(Difficulty, {
		target: document.body,
		props: { difficulty: 'easy' }
	});

	expect(document.body.querySelector('span')).not.toBeNull();
	expect(document.body.querySelector('span').textContent).toBe('easy');

	unmount(component);
});

test('Difficulty component with custom class', () => {
	const component = mount(Difficulty, {
		target: document.body,
		props: { difficulty: 'easy', class: 'custom-class' }
	});

	expect(document.body.querySelector('span')).not.toBeNull();
	expect(document.body.querySelector('span').classList.contains('custom-class')).toBe(true);

	unmount(component);
});

test('Difficulty component with custom style', () => {
	const component = mount(Difficulty, {
		target: document.body,
		props: { difficulty: 'easy', style: 'color: red;' }
	});

	expect(document.body.querySelector('span')).not.toBeNull();
	expect(document.body.querySelector('span').style.color).toBe('red');

	unmount(component);
});

test('Difficulty component with unknow text', () => {
	const component = mount(Difficulty, {
		target: document.body,
		props: { difficulty: 'easy', text: 'Easy' }
	});

	expect(document.body.querySelector('span')).not.toBeNull();
	expect(document.body.querySelector('span').textContent).toBe('Easy');

	unmount(component);
});
