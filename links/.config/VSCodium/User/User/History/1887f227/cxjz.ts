
import db from '.';

export async function exemple(): Promise<void> {
	const query = 'DELETE FROM song WHERE id = ?';
	await db.execute(query, [params]);
}
