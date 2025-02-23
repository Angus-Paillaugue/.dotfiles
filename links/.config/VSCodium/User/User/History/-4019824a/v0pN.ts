import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ClassScope extends ScopeBase<ScopeType.class, TSESTree.ClassDeclaration | TSESTree.ClassExpression, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ClassScope['upper'], block: ClassScope['block']);
}
export { ClassScope };
//# sourceMappingURL=ClassScope.d.ts.map
