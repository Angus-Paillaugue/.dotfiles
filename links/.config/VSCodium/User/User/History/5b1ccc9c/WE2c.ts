import type { AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { ConstType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ObjectType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { IntersectAny } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/any";
import type { IntersectArray } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/array";
import type { IntersectConst } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/const";
import type { IntersectEnum } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/enum";
import type { IntersectObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/object";
import type { IntersectPrimitive } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/primitive";
import type { IntersectTuple } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/tuple";
import type { IntersectUnion } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/union";
export declare type Intersect<META_TYPE_A extends Type, META_TYPE_B extends Type> = $Intersect<META_TYPE_A, META_TYPE_B>;
export declare type $Intersect<META_TYPE_A, META_TYPE_B> = META_TYPE_A extends NeverType ? META_TYPE_A : META_TYPE_A extends AnyType ? IntersectAny<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ConstType ? IntersectConst<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends EnumType ? IntersectEnum<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends PrimitiveType ? IntersectPrimitive<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ArrayType ? IntersectArray<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends TupleType ? IntersectTuple<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends ObjectType ? IntersectObject<META_TYPE_A, META_TYPE_B> : META_TYPE_A extends UnionType ? IntersectUnion<META_TYPE_A, META_TYPE_B> : Never;
