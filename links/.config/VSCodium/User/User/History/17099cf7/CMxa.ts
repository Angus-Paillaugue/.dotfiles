import type { PageLoad } from './$types';

export const load = (async () => {
  const changeLog = [
    {
      version: '1.0.0',
      date: '2021-07-01',
      changes: ['Initial release']
    },
    {
      version: '1.0.0',
      date: '2021-07-01',
      changes: ['Initial release']
    },
    {
      version: '1.0.0',
      date: '2021-07-01',
      changes: [
        'Initial release',
      ],
    },
  ];
  return { changeLog };
}) satisfies PageLoad;
