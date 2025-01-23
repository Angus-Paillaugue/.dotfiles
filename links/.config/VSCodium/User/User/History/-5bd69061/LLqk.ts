import type { Stringifiable } from "@ark/util";
import type { Comparator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/shared.ts";
import type { DefAst, InferredAst, InfixExpression, PostfixExpression } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
export type astToString<ast> = ast extends InferredAst | DefAst ? ast[2] : ast extends PostfixExpression<infer operator, infer operand> ? operator extends "[]" ? `${astToString<operand>}[]` : never : ast extends InfixExpression<infer operator, infer l, infer r> ? operator extends "&" | "|" | "%" | Comparator ? `${astToString<l>} ${operator} ${astToString<r>}` : never : ast extends Stringifiable ? `${ast extends bigint ? `${ast}n` : ast}` : "...";
