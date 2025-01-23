import DB from './';

export interface Card {
  id: number;
  title?: string;
  description?: string;
  request: string;
  colSpan?: number;
  type: 'table' | 'chart';
  data?: unknown[];
  config?: unknown;
}

export interface Dashboard {
  id: number;
  title: string;
  description?: string;
  cards: Card[];
}

async function getCardData(card: Card): Promise<unknown[]> {
  const sql = card.request;
  const [data] = await DB.query(sql);
  return data as unknown[];
}

export async function getDashboard(id: string, userId: number): Promise<Dashboard> {
  const dashboardSql = `
  SELECT
    *
  FROM dashboard
  WHERE dashboard.id = ?
  AND userId = ?
  `;
  const [dashboards] = await DB.query(dashboardSql, [id, userId]);
  if (dashboards.length === 0) {
    throw new Error('Dashboard not found');
  }
  const dashboard = dashboards[0];

  const cardsSQL = `
  SELECT
    *
  FROM card
  WHERE card.dashboardId = ?
  `;
  const [cards] = await DB.query(cardsSQL, [id]);
  await Promise.all(
    (cards as Card[]).map(async (card) => {
      if (card.request && card.type === 'table') {
        card.data = await getCardData(card);
      }
      return card;
    })
  );
  dashboard.cards = cards;

  return dashboard;
}

export async function updateDashboard(id: string, userId: number, data: Partial<Dashboard>): Promise<void> {
  const dashboardSql = `
  UPDATE dashboard
  SET ?
  WHERE dashboard.id = ?
  AND userId = ?
  `;
  await DB.query(dashboardSql, [data, id, userId]);
}
