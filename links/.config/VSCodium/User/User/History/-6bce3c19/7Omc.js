import db from './index.js';
import { eq, sql, count } from 'drizzle-orm';
import { users, submissions, exercises } from './schema.js';

export async function createNewUser(username, hash) {
  await db.insert(users).values({ username, password_hash: hash })
}

export async function findUserByUsername(username) {
	console.log(username);

  return await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, username)
	});
}

export async function getProfile(userId) {
	// Get user rank
	const userRank = await db
		.select({
			user_id: users.id,
			username: users.username,
			distinct_exercise_count: sql`COUNT(DISTINCT ${submissions.exercise_id})`,
			user_rank: sql`RANK() OVER (ORDER BY COUNT(DISTINCT ${submissions.exercise_id}) DESC)`
		})
		.from(users)
		.leftJoin(submissions, eq(users.id, submissions.user_id))
		.groupBy(users.id, users.username)
		.where(eq(users.id, userId));

	// Get total number of exercises
	const totalExercises = await db
		.select({
			no_exercises: count()
		})
		.from(exercises);

	// Get recent activity
	const recentActivity = await db
		.select({
			completed_at: submissions.completed_at,
			exercise_id: exercises.id,
			exercise_difficulty: exercises.difficulty,
			title: exercises.title,
			slug: exercises.slug
		})
		.from(submissions)
		.join(exercises, eq(submissions.exercise_id, exercises.id))
		.where(eq(submissions.user_id, userId))
		.orderBy(submissions.completed_at, 'desc')
		.limit(50);

	// Get contributions
	const contributions = await db
		.select({
			submission_date: sql`DATE(${submissions.completed_at})`,
			submission_count: sql`COUNT(${submissions.id})`
		})
		.from(submissions)
		.where(eq(submissions.user_id, userId))
		.groupBy(sql`DATE(${submissions.completed_at})`);

	return {
		rank: userRank[0],
		totalExercises: totalExercises[0].no_exercises,
		recentActivity,
		contributions
	};
}

export async function getAdminDashboardStats() {
	const noUsers = await db.select({ count: count() }).from(users);
	// Count the number of exercises
	const noExercises = await db.select({ count: count() }).from(exercises);
	// Get all exercises
	const allExercises = await db.select().from(exercises);
  return { noUsers: noUsers[0].count, noExercises: noExercises[0].count, allExercises };
}

export async function deleteUser(userId) {
	await db.delete(submissions).where(eq(submissions.user_id, userId));
	await db.delete(users).where(eq(users.id, userId));
}

export function updatePassword(userId, hash) {
	return db.update(users).set({ password_hash: hash }).where(eq(users.id, userId));
}

export function updateUsername(userId, username) {
	return db.update(users).set({ username }).where(eq(users.id, userId));
}

export function updateProfilePicture(userId, profilePicture) {
	return db.update(users).set({ profile_picture: profilePicture }).where(eq(users.id, userId));
}

export async function getDefaultProfilePicturePath() {
	const [defaultProfilePicturePath] = await db.query(
		"SELECT Column_Default default_path FROM Information_Schema.Columns WHERE Table_Name = 'users' AND Column_Name = 'profile_picture'"
	);
	return defaultProfilePicturePath.default_path;
}
