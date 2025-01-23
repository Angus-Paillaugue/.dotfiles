import db from './index.js';
import { eq, sql, count, desc } from 'drizzle-orm';
import { users, submissions, exercises } from './schema.js';
import * as m from '$msgs';
import { User, Exercise } from '$lib/types';

export async function createNewUser(username: string, hash: string): Promise<void> {
	await db.insert(users).values({ username, password_hash: hash });
}

export async function findUserByUsername(username: string): Promise<User> {
	const user = await db
		.select({
			id: users.id,
			username: users.username,
			profile_picture: users.profile_picture,
			admin: users.admin,
			created_at: users.created_at,
			password_hash: users.password_hash
		})
		.from(users)
		.where(eq(users.username, username))
		.limit(1);

	if (user.length === 0) {
		throw new Error(m.error_messages_db_users_user_not_found());
	}

	return user[0];
}

export async function usernameIsTaken(username: string): Promise<boolean> {
	const user = await db
		.select({
			id: users.id
		})
		.from(users)
		.where(eq(users.username, username))
		.limit(1);

	return user.length > 0;
}

export interface Profile {
	rank: {
		user_id: number;
		username: string;
		distinct_exercise_count: number;
		user_rank: number;
		no_exercises: number;
	};
	recentActivity: Array<{
		completed_at: Date;
		exercise_id: number;
		exercise_difficulty: string;
		title: string;
		slug: string;
	}>;
	contributions: Array<{
		submission_date: string;
		submission_count: number;
	}>;
}

export async function getProfile(userId: number): Promise<Profile> {
	// Get user rank
	const userRank = await db
		.select({
			user_id: users.id,
			username: users.username,
			distinct_exercise_count: sql`COUNT(DISTINCT ${submissions.exercise_id})`.as<number>(),
			user_rank:
				sql`RANK() OVER (ORDER BY COUNT(DISTINCT ${submissions.exercise_id}) DESC)`.as<number>()
		})
		.from(users)
		.leftJoin(submissions, eq(users.id, submissions.user_id))
		.groupBy(users.id, users.username)
		.where(eq(users.id, userId));

	// Get total number of exercises
	const totalExercises = await db
		.select({
			no_exercises: count().as<number>()
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
		.leftJoin(exercises, eq(submissions.exercise_id, exercises.id))
		.where(eq(submissions.user_id, userId))
		.orderBy(desc(submissions.completed_at))
		.limit(50);

	// Get contributions
	const contributions = await db
		.select({
			submission_date: sql`DATE(${submissions.completed_at})`.as<string>(),
			submission_count: sql`COUNT(${submissions.id})`.as<number>()
		})
		.from(submissions)
		.where(eq(submissions.user_id, userId))
		.groupBy(sql`DATE(${submissions.completed_at})`);

	const rank = userRank[0];
	rank.no_exercises = totalExercises[0].no_exercises;
	return {
		rank,
		recentActivity,
		contributions
	};
}

export interface AdminDashboardStats {
	noUsers: number;
	noExercises: number;
	allExercises: Exercise[];
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
	const noUsersResult = await db.select({ count: count().as<number>() }).from(users);
	const noExercisesResult = await db.select({ count: count().as<number>() }).from(exercises);
	const allExercises = await db.select().from(exercises);
	return {
		noUsers: noUsersResult[0].count,
		noExercises: noExercisesResult[0].count,
		allExercises
	};
}

export async function deleteUser(userId: number): Promise<void> {
	await db.delete(submissions).where(eq(submissions.user_id, userId));
	await db.delete(users).where(eq(users.id, userId));
}

export async function updatePassword(userId: number, hash: string): Promise<void> {
	await db.update(users).set({ password_hash: hash }).where(eq(users.id, userId));
}

export async function updateUsername(userId: number, username: string): Promise<void> {
	await db.update(users).set({ username }).where(eq(users.id, userId));
}

export async function updateProfilePicture(userId: number, profilePicture: string): Promise<void> {
	await db.update(users).set({ profile_picture: profilePicture }).where(eq(users.id, userId));
}

export async function getDefaultProfilePicturePath(): Promise<string> {
	const result = await db.execute<{ default_path: string }>(
		sql`SELECT Column_Default AS default_path FROM Information_Schema.Columns WHERE Table_Name = 'users' AND Column_Name = 'profile_picture'`
	);

	if (result.length === 0) {
		throw new Error(m.error_messages_db_users_default_profile_picture_path_not_found());
	}

	return result[0].default_path;
}
