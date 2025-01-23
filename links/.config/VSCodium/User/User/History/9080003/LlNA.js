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
test('shows warning for invalid variant in development mode', () => {
	process.env.NODE_ENV = 'development';
	const { getByText } = render(Button, { variant: 'invalidVariant' });
	expect(getByText('Invalid variant: invalidVariant')).toBeInTheDocument();
});

test('does not show warning for valid variant in development mode', () => {
  process.env.NODE_ENV = 'development';
  const { queryByText } = render(Button, { variant: 'secondary' });
  expect(queryByText('Invalid variant: secondary')).not.toBeInTheDocument();
});

test('does not show warning in production mode', () => {
  process.env.NODE_ENV = 'production';
  const { queryByText } = render(Button, { variant: 'invalidVariant' });
  expect(queryByText('Invalid variant: invalidVariant')).not.toBeInTheDocument();
});
