import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class TSEnumNameDefinition extends DefinitionBase<DefinitionType.TSEnumName, TSESTree.TSEnumDeclaration, null, TSESTree.Identifier> {
    readonly isTypeDefinition = true;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.Identifier, node: TSEnumNameDefinition['node']);
}
export { TSEnumNameDefinition };
//# sourceMappingURL=TSEnumNameDefinition.d.ts.map
