import { render, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';
import Button from '$lib/components/Button.svelte';
import { tick } from 'svelte';

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
	const { getByRole, getByText } = render(Button, { loading: true });
	const button = getByRole('button');
	expect(button).toBeInTheDocument();
	await tick();
	expect(getByText('Spinner')).toBeInTheDocument();
});

// Test invalid variant warning in development mode
test('shows warning for invalid variant in development mode', () => {
	process.env.NODE_ENV = 'development';
	const { getByText } = render(Button, { variant: 'invalidVariant' });
	expect(getByText('Invalid variant: invalidVariant')).toBeInTheDocument();
});

// Test resize handling
test('adjusts size on window resize', async () => {
	const { getByRole } = render(Button);
	const button = getByRole('button');
	const initialWidth = button.style.width;
	window.dispatchEvent(new Event('resize'));
	await tick();
	expect(button.style.width).not.toBe(initialWidth);
});
