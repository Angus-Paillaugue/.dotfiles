import { expect, test } from 'vitest';
import { formatDate } from './utils';

test('Date formatting', () => {
	const formattedDate = formatDate(new Date(2021, 0, 1));

	expect(formattedDate).toEqual('Jan 1, 2021');
});


test('Date formatting with custom style', () => {
  const formattedDate = formatDate(new Date(2021, 0, 1), 'full');

  expect(formattedDate).toEqual('Friday, January 1, 2021');
});

test('Date formatting with custom locale', () => {
  const formattedDate = formatDate(new Date(2021, 0, 1), 'full', 'fr');

  expect(formattedDate).toEqual('vendredi 1 janvier 2021');
});
