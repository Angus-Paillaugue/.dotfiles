import type {Except} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/except';
import type {Simplify} from '.pnpm/type-fest@2.19.0/node_modules/type-fest/source/simplify';

type Merge_<FirstType, SecondType> = Except<FirstType, Extract<keyof FirstType, keyof SecondType>> & SecondType;

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import type {Merge} from 'type-fest';

type Foo = {
	a: number;
	b: string;
};

type Bar = {
	b: number;
};

const ab: Merge<Foo, Bar> = {a: 1, b: 2};
```

@category Object
*/
export type Merge<FirstType, SecondType> = Simplify<Merge_<FirstType, SecondType>>;
