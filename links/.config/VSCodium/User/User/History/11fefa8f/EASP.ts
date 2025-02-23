import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class FunctionNameDefinition extends DefinitionBase<DefinitionType.FunctionName, TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.TSDeclareFunction | TSESTree.TSEmptyBodyFunctionExpression, null, TSESTree.Identifier> {
    readonly isTypeDefinition = false;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.Identifier, node: FunctionNameDefinition['node']);
}
export { FunctionNameDefinition };
//# sourceMappingURL=FunctionNameDefinition.d.ts.map
