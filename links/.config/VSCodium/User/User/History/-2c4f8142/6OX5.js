import {
	mysqlTable,
	int,
	text,
	varchar,
	timestamp,
	mysqlEnum,
	boolean
} from 'drizzle-orm/mysql-core';

import { relations } from 'drizzle-orm/relations';

export const exerciseTests = mysqlTable('exercise_tests', {
	id: int('id').autoincrement().primaryKey().notNull(),
	exerciseId: int('exercise_id').references(() => exercises.id),
	input: text('input').notNull(),
	displayValue: varchar('display_value', { length: 255 }),
	expectedOutput: text('expected_output').notNull()
});

export const exercises = mysqlTable('exercises', {
	id: int('id').autoincrement().primaryKey().notNull(),
	title: varchar('title', { length: 100 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	'created_at': timestamp('created_at', { mode: 'string' }).default(
		timestamp().defaultNow()
	),
	difficulty: mysqlEnum('difficulty', ['easy', 'medium', 'hard']).default('easy'),
	'learning_path_id': int('learning_path_id').references(() => learningPaths.id, {
		onDelete: 'restrict',
		onUpdate: 'restrict'
	}),
	'language_id': int('language_id').references(() => languages.id, { onDelete: 'set null' })
});

export const languages = mysqlTable('languages', {
	id: int('id').autoincrement().primaryKey().notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	description: text('description'),
	'created_at': timestamp('created_at', { mode: 'string' }).default(timestamp().defaultNow())
});

export const learningPaths = mysqlTable('learning_paths', {
	id: int('id').autoincrement().primaryKey().notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	description: text('description').notNull()
});

export const submissions = mysqlTable('submissions', {
	id: int('id').autoincrement().primaryKey().notNull(),
	userId: int('user_id').references(() => users.id),
	exerciseId: int('exercise_id').references(() => exercises.id),
	submission: text('submission'),
	ramUsage: int('ram_usage'),
	completedAt: timestamp('completed_at', { mode: 'string' }).default(
		timestamp().defaultNow()
	)
});

export const users = mysqlTable('users', {
	id: int('id').autoincrement().primaryKey().notNull(),
	username: varchar('username', { length: 50 }).notNull(),
	profile_picture: varchar('profile_picture', { length: 255 })
		.default('/profile_picture/default_avatar.jpg')
		.notNull(),
	password_hash: varchar('password_hash', { length: 255 }).notNull(),
	admin: boolean('admin').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).default(timestamp().defaultNow())
});
export const exerciseTestsRelations = relations(exerciseTests, ({ one }) => ({
	exercise: one(exercises, {
		fields: [exerciseTests.exerciseId],
		references: [exercises.id]
	})
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
	exerciseTests: many(exerciseTests),
	language: one(languages, {
		fields: [exercises.languageId],
		references: [languages.id]
	}),
	learningPath: one(learningPaths, {
		fields: [exercises.learningPathId],
		references: [learningPaths.id]
	}),
	submissions: many(submissions)
}));

export const languagesRelations = relations(languages, ({ many }) => ({
	exercises: many(exercises)
}));

export const learningPathsRelations = relations(learningPaths, ({ many }) => ({
	exercises: many(exercises)
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
	exercise: one(exercises, {
		fields: [submissions.exerciseId],
		references: [exercises.id]
	}),
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	})
}));

export const usersRelations = relations(users, ({ many }) => ({
	submissions: many(submissions)
}));
