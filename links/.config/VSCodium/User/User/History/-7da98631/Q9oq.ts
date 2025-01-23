import type { writeUnassignableDefaultValueMessage } from "@ark/schema";
import type { ErrorMessage } from "@ark/util";
import type { type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { UnitLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operator/default.ts";
import type { inferAstIn } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { astToString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/utils.ts";
import type { validateAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
export type validateDefault<baseAst, unitLiteral extends UnitLiteral, $, args> = validateAst<baseAst, $, args> extends infer e extends ErrorMessage ? e : type.infer<unitLiteral> extends inferAstIn<baseAst, $, args> ? undefined : ErrorMessage<writeUnassignableDefaultValueMessage<astToString<baseAst>, unitLiteral>>;
