import type { AnyType, ResolveAny } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType, ResolveArray } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { ConstType, ResolveConst } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType, ResolveEnum } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { NeverType, ResolveNever } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ObjectType, ResolveObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType, ResolvePrimitive } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { ResolveTuple, TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { ResolveUnion, UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
export declare type ResolveOptions = {
    deserialize: boolean;
};
export declare type ResolveDefaultOptions = {
    deserialize: true;
};
export declare type Resolve<META_TYPE extends Type, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = $Resolve<META_TYPE, OPTIONS>;
export declare type $Resolve<META_TYPE, OPTIONS extends ResolveOptions = ResolveDefaultOptions> = META_TYPE extends AnyType ? ResolveAny<META_TYPE, OPTIONS> : META_TYPE extends NeverType ? ResolveNever : META_TYPE extends ConstType ? ResolveConst<META_TYPE, OPTIONS> : META_TYPE extends EnumType ? ResolveEnum<META_TYPE, OPTIONS> : META_TYPE extends PrimitiveType ? ResolvePrimitive<META_TYPE, OPTIONS> : META_TYPE extends ArrayType ? ResolveArray<META_TYPE, OPTIONS> : META_TYPE extends TupleType ? ResolveTuple<META_TYPE, OPTIONS> : META_TYPE extends ObjectType ? ResolveObject<META_TYPE, OPTIONS> : META_TYPE extends UnionType ? ResolveUnion<META_TYPE, OPTIONS> : never;
