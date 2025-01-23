import {
	exercises,
	exerciseTests,
	languages,
	learningPaths,
	submissions,
	users
} from '$lib/server/db/schema';

type SelectExercise = typeof exercises.$inferSelect;
type InsertExercise = typeof exercises.$inferInsert;
