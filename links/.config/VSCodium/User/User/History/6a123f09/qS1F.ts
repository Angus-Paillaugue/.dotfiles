import type {Except} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/except';
import type {Simplify} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/simplify';

/**
Create a type that makes the given keys optional. The remaining keys are kept as is. The sister of the `SetRequired` type.

Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are optional.

@example
```
import type {SetOptional} from 'type-fest';

type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
// type SomeOptional = {
// 	a: number;
// 	b?: string; // Was already optional and still is.
// 	c?: boolean; // Is now optional.
// }
```

@category Object
*/
export type SetOptional<BaseType, Keys extends keyof BaseType> =
	Simplify<
		// Pick just the keys that are readonly from the base type.
		Except<BaseType, Keys> &
		// Pick the keys that should be mutable from the base type and make them mutable.
		Partial<Pick<BaseType, Keys>>
	>;
