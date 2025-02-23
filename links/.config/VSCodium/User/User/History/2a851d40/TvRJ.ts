import type { TSESTree } from '@typescript-eslint/types';
import type { Reference } from '../../src/referencer/Reference';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Variable } from '../../src/variable';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class FunctionScope extends ScopeBase<ScopeType.function, TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.Program | TSESTree.TSDeclareFunction | TSESTree.TSEmptyBodyFunctionExpression, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: FunctionScope['upper'], block: FunctionScope['block'], isMethodDefinition: boolean);
    protected isValidResolution(ref: Reference, variable: Variable): boolean;
}
export { FunctionScope };
//# sourceMappingURL=FunctionScope.d.ts.map
