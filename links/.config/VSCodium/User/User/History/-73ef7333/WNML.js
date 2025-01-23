import { flushSync, mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Input from '../Input.svelte';

test('Component', () => {
	// Instantiate the component using Svelte's `mount` API
	const component = mount(Input, {
		target: document.body, // `document` exists because of jsdom
		props: { initial: 0 }
	});

	expect(document.body.innerHTML).toBe('<button>0</button>');

	// Click the button, then flush the changes so you can synchronously write expectations
	document.body.querySelector('button').click();
	flushSync();

	expect(document.body.innerHTML).toBe('<button>1</button>');

	// Remove the component from the DOM
	unmount(component);
});
