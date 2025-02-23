import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class ParameterDefinition extends DefinitionBase<DefinitionType.Parameter, TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.TSCallSignatureDeclaration | TSESTree.TSConstructorType | TSESTree.TSConstructSignatureDeclaration | TSESTree.TSDeclareFunction | TSESTree.TSEmptyBodyFunctionExpression | TSESTree.TSFunctionType | TSESTree.TSMethodSignature, null, TSESTree.BindingName> {
    /**
     * Whether the parameter definition is a part of a rest parameter.
     */
    readonly isTypeDefinition = false;
    readonly isVariableDefinition = true;
    readonly rest: boolean;
    constructor(name: TSESTree.BindingName, node: ParameterDefinition['node'], rest: boolean);
}
export { ParameterDefinition };
//# sourceMappingURL=ParameterDefinition.d.ts.map
