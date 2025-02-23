import type {SplitIncludingDelimiters} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/delimiter-case';
import type {SnakeCase} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/snake-case';
import type {Includes} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/includes';

/**
Returns a boolean for whether the string is screaming snake case.
*/
type IsScreamingSnakeCase<Value extends string> = Value extends Uppercase<Value>
	? Includes<SplitIncludingDelimiters<Lowercase<Value>, '_'>, '_'> extends true
		? true
		: false
	: false;

/**
Convert a string literal to screaming-snake-case.

This can be useful when, for example, converting a camel-cased object property to a screaming-snake-cased SQL column name.

@example
```
import type {ScreamingSnakeCase} from 'type-fest';

const someVariable: ScreamingSnakeCase<'fooBar'> = 'FOO_BAR';
```

@category Change case
@category Template literal
*/
export type ScreamingSnakeCase<Value> = Value extends string
	? IsScreamingSnakeCase<Value> extends true
		? Value
		: Uppercase<SnakeCase<Value>>
	: Value;
