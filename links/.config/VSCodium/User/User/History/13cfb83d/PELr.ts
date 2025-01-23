import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db';
import { updateDashboard } from '$lib/server/db/dashboard';

export const POST: RequestHandler = async ({ request }) => {
  const { dashboard } = await request.json();
  try {
    const res = await updateDashboard(dashboard.id, dashboard.userId, dashboard);
    return json({
      success: true,
      message: 'Successfully updated dashboard',
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: true, message: error.message, results: [] });
    } else {
      return json({
        error: true,
        message: 'An unexpected error occurred!',
        results: []
      });
    }
  }
};
