import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/svelte';
import { Button } from '$lib/components';
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

// Test invalid variant warning in development mode
test('shows warning for invalid variant', () => {
	const { getByText } = render(Button, { variant: 'invalidVariant' });
	expect(getByText('Invalid variant: invalidVariant')).toBeInTheDocument();
});

test('renders with custom class', () => {
  const { getByRole } = render(Button, { class: 'custom-class' });
  const button = getByRole('button');
  expect(button).toHaveClass('custom-class');
});


