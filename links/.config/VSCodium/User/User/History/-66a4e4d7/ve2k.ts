import type { satisfy } from "@ark/util";
import type { Anonymous, AtLeastLength, AtMostLength, AttributeKind, Attributes, Default, ExactlyLength, LengthAttributeKind, LessThanLength, MoreThanLength, Nominal, Optional, brand, constraint, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
import { alpha } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/alpha.ts";
import { alphanumeric } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/alphanumeric.ts";
import { base64 } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/base64.ts";
import { capitalize } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/capitalize.ts";
import { creditCard } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/creditCard.ts";
import { stringDate } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/date.ts";
import { digits } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/digits.ts";
import { email } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/email.ts";
import { type stringInteger } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/integer.ts";
import { ip } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/ip.ts";
import { type stringJson } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/json.ts";
import { lower } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/lower.ts";
import { normalize } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/normalize.ts";
import { type stringNumeric } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/numeric.ts";
import { semver } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/semver.ts";
import { trim } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/trim.ts";
import { upper } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/upper.ts";
import { url } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/url.ts";
import { uuid } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/uuid.ts";
export declare const string: Module<{
    trim: Submodule<trim.submodule>;
    normalize: Submodule<{
        root: unknown;
        NFC: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFD: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFKC: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFKD: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
    }>;
    alpha: unknown;
    alphanumeric: unknown;
    root: unknown;
    url: Submodule<url.submodule>;
    json: Submodule<stringJson.submodule>;
    base64: Submodule<{
        root: unknown;
        url: unknown;
    }>;
    creditCard: unknown;
    integer: Submodule<stringInteger.submodule>;
    date: Submodule<stringDate.submodule>;
    digits: unknown;
    email: unknown;
    ip: Submodule<ip.submodule>;
    numeric: Submodule<stringNumeric.submodule>;
    semver: unknown;
    uuid: Submodule<{
        root: string.matching<string> | "00000000-0000-0000-0000-000000000000" | "ffffffff-ffff-ffff-ffff-ffffffffffff";
        v4: unknown;
        v6: unknown;
        v1: unknown;
        v2: unknown;
        v3: unknown;
        v5: unknown;
        v7: unknown;
        v8: unknown;
    }>;
    capitalize: Submodule<capitalize.submodule>;
    lower: Submodule<lower.submodule>;
    upper: Submodule<upper.submodule>;
}>;
export type Matching<rule> = {
    matching: constraint<rule>;
};
export declare namespace string {
    type atLeastLength<rule> = of<string, AtLeastLength<rule>>;
    type moreThanLength<rule> = of<string, MoreThanLength<rule>>;
    type atMostLength<rule> = of<string, AtMostLength<rule>>;
    type lessThanLength<rule> = of<string, LessThanLength<rule>>;
    type exactlyLength<rule> = of<string, ExactlyLength<rule>>;
    type matching<rule> = of<string, Matching<rule>>;
    type anonymous = of<string, Anonymous>;
    type optional = of<string, Optional>;
    type defaultsTo<rule> = of<string, Default<rule>>;
    type nominal<rule> = of<string, Nominal<rule>>;
    type is<attributes extends Attributes> = of<string, attributes>;
    type AttributableKind = satisfy<AttributeKind, "matching" | LengthAttributeKind>;
    type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
    namespace raw {
        type withSingleAttribute<kind, value> = kind extends "nominal" ? nominal<value> : kind extends "matching" ? matching<value> : kind extends "atLeastLength" ? atLeastLength<value> : kind extends "atMostLength" ? atMostLength<value> : kind extends "moreThanLength" ? moreThanLength<value> : kind extends "lessThanLength" ? lessThanLength<value> : kind extends "optional" ? optional : kind extends "defaultsTo" ? defaultsTo<value> : never;
    }
    type module = Module<string.submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        alpha: alpha;
        alphanumeric: alphanumeric;
        base64: base64.submodule;
        capitalize: capitalize.submodule;
        creditCard: creditCard;
        date: stringDate.submodule;
        digits: digits;
        email: email;
        integer: stringInteger.submodule;
        ip: ip.submodule;
        json: stringJson.submodule;
        lower: lower.submodule;
        normalize: normalize.submodule;
        numeric: stringNumeric.submodule;
        semver: semver;
        trim: trim.submodule;
        upper: upper.submodule;
        url: url.submodule;
        uuid: uuid.submodule;
    };
    type branded<rule> = brand<string, Nominal<rule>>;
    namespace branded {
        type atLeastLength<rule> = brand<string, AtLeastLength<rule>>;
        type moreThanLength<rule> = brand<string, MoreThanLength<rule>>;
        type atMostLength<rule> = brand<string, AtMostLength<rule>>;
        type lessThanLength<rule> = brand<string, LessThanLength<rule>>;
        type exactlyLength<rule> = brand<string, ExactlyLength<rule>>;
        type matching<rule> = brand<string, Matching<rule>>;
        type anonymous = brand<string, Anonymous>;
        type is<attributes extends Attributes> = brand<string, attributes>;
        type withSingleAttribute<kind extends AttributableKind, value extends Attributes[kind]> = raw.withSingleAttribute<kind, value>;
        namespace raw {
            type withSingleAttribute<kind, value> = kind extends "nominal" ? branded<value> : kind extends "matching" ? matching<value> : kind extends "atLeastLength" ? atLeastLength<value> : kind extends "atMostLength" ? atMostLength<value> : kind extends "moreThanLength" ? moreThanLength<value> : kind extends "lessThanLength" ? lessThanLength<value> : never;
        }
    }
}
