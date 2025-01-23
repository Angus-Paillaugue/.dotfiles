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

export const exercise_tests = mysqlTable('exercise_tests', {
	id: int('id').autoincrement().primaryKey().notNull(),
	exerciseId: int('exercise_id').references(() => exercises.id),
	input: text('input').notNull(),
	'display_value': varchar('display_value', { length: 255 }),
	'expected_output': text('expected_output').notNull()
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
	'learning_path_id': int('learning_path_id').references(() => learning_paths.id, {
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

export const learning_paths = mysqlTable('learning_paths', {
	id: int('id').autoincrement().primaryKey().notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	description: text('description').notNull()
});

export const submissions = mysqlTable('submissions', {
	id: int('id').autoincrement().primaryKey().notNull(),
	'user_id': int('user_id').references(() => users.id),
	'exercise_id': int('exercise_id').references(() => exercises.id),
	submission: text('submission'),
	'ram_usage': int('ram_usage'),
	'completed_at': timestamp('completed_at', { mode: 'string' }).default(
		timestamp().defaultNow()
	)
});

export const users = mysqlTable('users', {
	id: int('id').autoincrement().primaryKey().notNull(),
	username: varchar('username', { length: 50 }).notNull(),
	'profile_picture': varchar('profile_picture', { length: 255 })
		.default('/profile_picture/default_avatar.jpg')
		.notNull(),
	'password_hash': varchar('password_hash', { length: 255 }).notNull(),
	admin: boolean('admin').default(false).notNull(),
	'created_at': timestamp('created_at', { mode: 'string' }).default(timestamp())
});
export const exerciseTestsRelations = relations(exercise_tests, ({ one }) => ({
	exercise: one(exercises, {
		fields: [exercise_tests.exerciseId],
		references: [exercises.id]
	})
}));

export const exercises_relations = relations(exercises, ({ one, many }) => ({
	'exercise_tests': many(exercise_tests),
	language: one(languages, {
		fields: [exercises.languageId],
		references: [languages.id]
	}),
	'learning_path': one(learning_paths, {
		fields: [exercises.learningPathId],
		references: [learning_paths.id]
	}),
	submissions: many(submissions)
}));

export const languages_relations = relations(languages, ({ many }) => ({
	exercises: many(exercises)
}));

export const learning_paths_relations = relations(learning_paths, ({ many }) => ({
	exercises: many(exercises)
}));

export const submissions_relations = relations(submissions, ({ one }) => ({
	exercise: one(exercises, {
		fields: [submissions.exerciseId],
		references: [exercises.id]
	}),
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	})
}));

export const users_relations = relations(users, ({ many }) => ({
	submissions: many(submissions)
}));
