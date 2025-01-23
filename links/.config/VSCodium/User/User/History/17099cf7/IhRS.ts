import type { PageLoad } from './$types';

export const load = (async () => {
  interface Release {
    version: string;
    date: string;
    notes?: string[];
    fixes?: string[];
    breakingChanges?: string[];
    features?: string[];
  }
  const changeLog: Release[] = [
    {
      version: '1.0.0',
      date: '2021-07-01',
      notes: [
        'Initial release',
      ],
      fixes: [],
    },
  ];
  return { changeLog };
}) satisfies PageLoad;
