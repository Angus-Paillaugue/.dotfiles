import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const db = await createConnection();

  try {
    const [rows] = await db.query(`SELECT * FROM results`);

    const series = [
      {
        name:'Download',
        data: rows.map((row) => {
          return {
            x: row.created_at,
            y: row.download
          }
        })
      },
      {
        name:'Upload',
        data: rows.map((row) => {
          return {
            x: row.created_at,
            y: row.upload
          }
        })
      },
      {
        name:'Ping',
        data: rows.map((row) => {
          return {
            x: row.created_at,
            y: row.ping
          }
        })
      }
    ];

    const annotations = {
      xaxis: rows.filter((row) => row.download === 0 && row.upload === 0).map((row) => {
        return {
          x: new Date(row.created_at).getTime(),
          borderColor: '#775DD0',
          label: {
            text: 'No internet',
            style: {
              color: '#fff',
              background: '#ff0000'
            }
          }
        };
      }),
    };


    await db.end();
    return { series, annotations };
  } catch (error) {
    console.error('Error while getting speedtest results:', error);
    return {};
  }

}
