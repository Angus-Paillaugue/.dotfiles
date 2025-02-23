import type { And, Not } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { _$Exclude } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/exclusion";
export declare type ValueExclusionResult<VALUE_A extends Type, IS_ALLOWED_IN_A extends boolean, IS_REQUIRED_IN_A extends boolean, VALUE_B extends Type, IS_ALLOWED_IN_B extends boolean, IS_REQUIRED_IN_B extends boolean> = {
    sourceValue: VALUE_A;
    isAllowedInSource: IS_ALLOWED_IN_A;
    isRequiredInSource: IS_REQUIRED_IN_A;
    isAllowedInExcluded: IS_ALLOWED_IN_B;
    isRequiredInExcluded: IS_REQUIRED_IN_B;
    exclusionResult: _$Exclude<VALUE_A, VALUE_B>;
};
export declare type ValueExclusionResultType = {
    sourceValue: Type;
    isAllowedInSource: boolean;
    isRequiredInSource: boolean;
    isAllowedInExcluded: boolean;
    isRequiredInExcluded: boolean;
    exclusionResult: any;
};
export declare type SourceValue<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["sourceValue"];
declare type IsAllowedInSource<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["isAllowedInSource"];
declare type IsRequiredInSource<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["isRequiredInSource"];
export declare type ExclusionResult<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["exclusionResult"];
declare type IsAllowedInExcluded<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["isAllowedInExcluded"];
declare type IsRequiredInExcluded<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = VALUE_EXCLUSION_RESULT["isRequiredInExcluded"];
export declare type IsOutsideOfSourceScope<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = And<Not<IsAllowedInSource<VALUE_EXCLUSION_RESULT>>, IsRequiredInExcluded<VALUE_EXCLUSION_RESULT>>;
export declare type IsOutsideOfExcludedScope<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = And<IsRequiredInSource<VALUE_EXCLUSION_RESULT>, Not<IsAllowedInExcluded<VALUE_EXCLUSION_RESULT>>>;
export declare type IsOmittable<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = And<Not<IsRequiredInSource<VALUE_EXCLUSION_RESULT>>, IsRequiredInExcluded<VALUE_EXCLUSION_RESULT>>;
export declare type PropagateExclusion<VALUE_EXCLUSION_RESULT extends ValueExclusionResultType> = ExclusionResult<VALUE_EXCLUSION_RESULT> extends NeverType ? SourceValue<VALUE_EXCLUSION_RESULT> : ExclusionResult<VALUE_EXCLUSION_RESULT>;
export {};
