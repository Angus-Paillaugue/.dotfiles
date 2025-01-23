import { expect, test } from 'vitest';
import { formatDate } from './utils';

test('Date formatting', () => {
	let formattedDate = formatDate(new Date(2021, 0, 1));
  console.log(formattedDate);

	// expect(double.value).toEqual(0);

	// double.set(5);

	// expect(double.value).toEqual(10);
});
