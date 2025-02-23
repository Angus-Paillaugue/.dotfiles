import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class FunctionTypeScope extends ScopeBase<ScopeType.functionType, TSESTree.TSCallSignatureDeclaration | TSESTree.TSConstructorType | TSESTree.TSConstructSignatureDeclaration | TSESTree.TSFunctionType | TSESTree.TSMethodSignature, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: FunctionTypeScope['upper'], block: FunctionTypeScope['block']);
}
export { FunctionTypeScope };
//# sourceMappingURL=FunctionTypeScope.d.ts.map
