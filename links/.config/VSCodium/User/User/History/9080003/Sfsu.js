import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/svelte';
import { Button } from '$lib/components';
import { tick } from 'svelte';
import { expect, test } from 'vitest';

// Test rendering with default props
test('renders with default props', () => {
	const { getByRole } = render(Button);
	const button = getByRole('button');
	expect(button).toBeInTheDocument();
});

// Test rendering with different variants
test('renders with different variants', () => {
	const { getByRole } = render(Button, { variant: 'secondary' });
	const button = getByRole('button');
	expect(button).toHaveClass('bg-neutral-700');
});

// Test loading state
test('shows loading spinner when loading is true', async () => {
	const { getByRole } = render(Button, { loading: true });
	const button = getByRole('button');
	expect(button).toBeInTheDocument();
	await tick();
	expect(getByRole('svg')).toBeInTheDocument();
});

// Test invalid variant warning in development mode
test('shows warning for invalid variant in development mode', () => {
	process.env.NODE_ENV = 'development';
	const { getByText } = render(Button, { variant: 'invalidVariant' });
	expect(getByText('Invalid variant: invalidVariant')).toBeInTheDocument();
});
