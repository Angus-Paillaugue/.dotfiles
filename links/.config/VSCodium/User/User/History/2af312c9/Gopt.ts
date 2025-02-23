import type { writeUnboundableMessage } from "@ark/schema";
import type { ErrorMessage, array, typeToString } from "@ark/util";
import type { LimitLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Comparator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/shared.ts";
import type { BoundExpressionKind, writeInvalidLimitMessage } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operator/bounds.ts";
import type { inferAstIn } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { astToString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/utils.ts";
import type { validateAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
export type validateRange<l, comparator extends Comparator, r, $, args> = [
    l
] extends [LimitLiteral] ? validateBound<r, comparator, l, "left", $, args> : [l] extends [[infer leftAst, Comparator, unknown]] ? ErrorMessage<writeDoubleRightBoundMessage<astToString<leftAst>>> : validateBound<l, comparator, r & LimitLiteral, "right", $, args>;
export type validateBound<boundedAst, comparator extends Comparator, limit extends LimitLiteral, boundKind extends BoundExpressionKind, $, args> = inferAstIn<boundedAst, $, args> extends infer bounded ? isNumericallyBoundable<bounded> extends true ? limit extends number ? validateAst<boundedAst, $, args> : ErrorMessage<writeInvalidLimitMessage<comparator, limit, boundKind>> : [bounded] extends [Date] ? validateAst<boundedAst, $, args> : ErrorMessage<writeUnboundableMessage<typeToString<bounded>>> : never;
type isNumericallyBoundable<bounded> = [
    bounded
] extends [number] ? true : [bounded] extends [string] ? true : [bounded] extends [array] ? true : false;
export declare const writeDoubleRightBoundMessage: <root extends string>(root: root) => writeDoubleRightBoundMessage<root>;
type writeDoubleRightBoundMessage<root extends string> = `Expression ${root} must have at most one right bound`;
export {};
