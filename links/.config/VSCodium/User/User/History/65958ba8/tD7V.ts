import type {Except} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/except';
import type {Simplify} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/simplify';

/**
Create a type that makes the given keys non-nullable. The remaining keys are kept as is.

Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are non-nullable.

@example
```
import type {SetNonNullable} from 'type-fest';

type Foo = {
	a: number;
	b: string | undefined;
	c?: boolean | null;
}

type SomeNonNullable = SetNonNullable<Foo, 'b' | 'c'>;
// type SomeNonNullable = {
// 	a: number;
// 	b: string; // Can no longer be undefined.
// 	c?: boolean; // Can no longer be null, but is still optional.
// }
```

@category Object
*/
export type SetNonNullable<BaseType, Keys extends keyof BaseType> =
	Simplify<
		// Pick just the keys that are readonly from the base type.
		Except<BaseType, Keys> &
		// Pick the keys that should be non-nullable from the base type and make them non-nullable.
		{[Key in Keys]: NonNullable<BaseType[Key]>}
	>;
