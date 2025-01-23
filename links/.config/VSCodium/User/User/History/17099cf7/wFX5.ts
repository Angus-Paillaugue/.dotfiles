import type { PageLoad } from './$types';

export const load = (async () => {
  const changeLog = [
    {
      version: '1.0.0',
      date: '2021-07-01',
      notes: [
        'Initial release',
      ],
      fixes: [],
      breakingChanges: [],
      features: [],
    },
  ];
  return { changeLog };
}) satisfies PageLoad;
