import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class FunctionExpressionNameScope extends ScopeBase<ScopeType.functionExpressionName, TSESTree.FunctionExpression, Scope> {
    readonly functionExpressionScope: true;
    constructor(scopeManager: ScopeManager, upperScope: FunctionExpressionNameScope['upper'], block: FunctionExpressionNameScope['block']);
}
export { FunctionExpressionNameScope };
//# sourceMappingURL=FunctionExpressionNameScope.d.ts.map
