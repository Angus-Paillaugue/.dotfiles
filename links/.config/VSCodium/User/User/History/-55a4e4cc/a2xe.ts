import type { satisfy } from "@ark/util";
import type { After, Anonymous, AtOrAfter, AtOrBefore, AttributeKind, Attributes, Before, brand, Default, Nominal, normalizeLimit, of, Optional } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
export declare namespace Date {
    type atOrAfter<rule> = of<Date, AtOrAfter<rule>>;
    type after<rule> = of<Date, After<rule>>;
    type atOrBefore<rule> = of<Date, AtOrBefore<rule>>;
    type before<rule> = of<Date, Before<rule>>;
    type anonymous = of<Date, Anonymous>;
    type nominal<rule> = of<Date, Nominal<rule>>;
    type optional = of<Date, Optional>;
    type defaultsTo<rule> = of<Date, Default<rule>>;
    type is<attributes extends Attributes> = of<Date, attributes>;
    type afterSchemaToConstraint<schema, rule> = schema extends {
        exclusive: true;
    } ? After<normalizeLimit<rule>> : AtOrAfter<normalizeLimit<rule>>;
    type beforeSchemaToConstraint<schema, rule> = schema extends {
        exclusive: true;
    } ? Before<normalizeLimit<rule>> : AtOrBefore<normalizeLimit<rule>>;
    type AttributableKind = satisfy<AttributeKind, "after" | "atOrAfter" | "before" | "atOrBefore">;
    type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
    namespace raw {
        type withSingleAttribute<kind, value> = kind extends "nominal" ? nominal<value> : kind extends "after" ? after<value> : kind extends "atOrAfter" ? atOrAfter<value> : kind extends "before" ? before<value> : kind extends "atOrBefore" ? atOrBefore<value> : kind extends "optional" ? optional : kind extends "defaultsTo" ? defaultsTo<value> : never;
    }
    type branded<rule> = brand<Date, Nominal<rule>>;
    namespace branded {
        type atOrAfter<rule> = brand<Date, AtOrAfter<rule>>;
        type after<rule> = brand<Date, After<rule>>;
        type atOrBefore<rule> = brand<Date, AtOrBefore<rule>>;
        type before<rule> = brand<Date, Before<rule>>;
        type anonymous = brand<Date, Anonymous>;
        type is<attributes extends Attributes> = brand<Date, attributes>;
        type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
        namespace raw {
            type withSingleAttribute<kind, value> = kind extends "nominal" ? branded<value> : kind extends "after" ? after<value> : kind extends "atOrAfter" ? atOrAfter<value> : kind extends "before" ? before<value> : kind extends "atOrBefore" ? atOrBefore<value> : never;
        }
    }
}
