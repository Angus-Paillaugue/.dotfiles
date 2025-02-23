import type { satisfy } from "@ark/util";
import type { Anonymous, AtLeast, AtMost, AttributeKind, Attributes, brand, Default, DivisibleBy, LessThan, MoreThan, Nominal, of, Optional } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
import { epoch } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/number/epoch.ts";
import { integer } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/number/integer.ts";
export declare const number: number.module;
export declare namespace number {
    type atLeast<rule> = of<number, AtLeast<rule>>;
    type moreThan<rule> = of<number, MoreThan<rule>>;
    type atMost<rule> = of<number, AtMost<rule>>;
    type lessThan<rule> = of<number, LessThan<rule>>;
    type divisibleBy<rule> = of<number, DivisibleBy<rule>>;
    type anonymous = of<number, Anonymous>;
    type optional = of<number, Optional>;
    type defaultsTo<rule> = of<number, Default<rule>>;
    type nominal<rule> = of<number, Nominal<rule>>;
    type NaN = nominal<"NaN">;
    type Infinity = nominal<"Infinity">;
    type NegativeInfinity = nominal<"NegativeInfinity">;
    type safe = nominal<"safe">;
    type is<attributes extends Attributes> = of<number, attributes>;
    type AttributableKind = satisfy<AttributeKind, "divisibleBy" | "moreThan" | "atLeast" | "atMost" | "lessThan">;
    type minSchemaToConstraint<schema, rule> = schema extends {
        exclusive: true;
    } ? MoreThan<rule> : AtLeast<rule>;
    type maxSchemaToConstraint<schema, rule> = schema extends {
        exclusive: true;
    } ? LessThan<rule> : AtMost<rule>;
    type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
    namespace raw {
        type withSingleAttribute<kind, value> = kind extends "nominal" ? nominal<value> : kind extends "divisibleBy" ? divisibleBy<value> : kind extends "moreThan" ? moreThan<value> : kind extends "atLeast" ? atLeast<value> : kind extends "atMost" ? atMost<value> : kind extends "lessThan" ? lessThan<value> : kind extends "optional" ? optional : kind extends "defaultsTo" ? defaultsTo<value> : never;
    }
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: number;
        epoch: epoch;
        integer: integer;
        safe: safe;
        NaN: NaN;
        Infinity: Infinity;
        NegativeInfinity: NegativeInfinity;
    };
    type branded<rule> = brand<number, Nominal<rule>>;
    namespace branded {
        type atLeast<rule> = brand<number, AtLeast<rule>>;
        type moreThan<rule> = brand<number, MoreThan<rule>>;
        type atMost<rule> = brand<number, AtMost<rule>>;
        type lessThan<rule> = brand<number, LessThan<rule>>;
        type divisibleBy<rule> = brand<number, DivisibleBy<rule>>;
        type is<attributes extends Attributes> = brand<number, attributes>;
        type anonymous = brand<number, Anonymous>;
        type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
        namespace raw {
            type withSingleAttribute<kind, value> = kind extends "nominal" ? branded<value> : kind extends "divisibleBy" ? divisibleBy<value> : kind extends "moreThan" ? moreThan<value> : kind extends "atLeast" ? atLeast<value> : kind extends "atMost" ? atMost<value> : kind extends "lessThan" ? lessThan<value> : never;
        }
    }
}
