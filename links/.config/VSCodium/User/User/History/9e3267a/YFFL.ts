import {
	exercises,
	exerciseTests,
	languages,
	learningPaths,
	submissions,
	users
} from '$lib/server/db/schema';

export type SelectExercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

export type SelectExerciseTests = typeof exerciseTests.$inferSelect;
export type InsertExerciseTests = typeof exerciseTests.$inferInsert;

export type SelectLanguages = typeof languages.$inferSelect;
export type InsertLanguages = typeof languages.$inferInsert;

export type SelectLearningPaths = typeof learningPaths.$inferSelect;
export type InsertLearningPaths = typeof learningPaths.$inferInsert;

export type SelectSubmissions = typeof submissions.$inferSelect;
export type InsertSubmissions = typeof submissions.$inferInsert;

export type SelectUsers = typeof users.$inferSelect;
export type InsertUsers = typeof users.$inferInsert;
