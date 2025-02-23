import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { ImplicitLibVariableOptions } from '../../src/variable';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class GlobalScope extends ScopeBase<ScopeType.global, TSESTree.Program,
/**
 * The global scope has no parent.
 */
null> {
    private readonly implicit;
    constructor(scopeManager: ScopeManager, block: GlobalScope['block']);
    close(scopeManager: ScopeManager): Scope | null;
    defineImplicitVariable(name: string, options: ImplicitLibVariableOptions): void;
}
export { GlobalScope };
//# sourceMappingURL=GlobalScope.d.ts.map
