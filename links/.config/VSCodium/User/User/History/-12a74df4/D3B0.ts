import { CastableBase } from "@ark/util";
import type { BaseNode } from "../node.js";
import type { NodeId } from "../parse.js";
import type { Discriminant } from "../roots/union.js";
import type { TraversalKind } from "./traversal.js";
export type CoercibleValue = string | number | boolean | null | undefined;
export declare class CompiledFunction<args extends readonly string[]> extends CastableBase<{
    [k in args[number]]: k;
}> {
    readonly argNames: args;
    readonly body = "";
    constructor(...args: args);
    indentation: number;
    indent(): this;
    dedent(): this;
    prop(key: PropertyKey, optional?: boolean): string;
    index(key: string | number, optional?: boolean): string;
    line(statement: string): this;
    const(identifier: string, expression: CoercibleValue): this;
    let(identifier: string, expression: CoercibleValue): this;
    set(identifier: string, expression: CoercibleValue): this;
    if(condition: string, then: (self: this) => this): this;
    elseIf(condition: string, then: (self: this) => this): this;
    else(then: (self: this) => this): this;
    /** Current index is "i" */
    for(until: string, body: (self: this) => this, initialValue?: CoercibleValue): this;
    /** Current key is "k" */
    forIn(object: string, body: (self: this) => this): this;
    block(prefix: string, contents: (self: this) => this, suffix?: string): this;
    return(expression?: CoercibleValue): this;
    write(name?: string): string;
    compile<f extends (...args: {
        [i in keyof args]: never;
    }) => unknown>(): f;
}
export declare const compileSerializedValue: (value: unknown) => string;
export declare const compileLiteralPropAccess: (key: PropertyKey, optional?: boolean) => string;
export declare const serializeLiteralKey: (key: PropertyKey) => string;
export declare const indexPropAccess: (key: string, optional?: boolean) => string;
export interface InvokeOptions extends ReferenceOptions {
    arg?: string;
}
export interface ReferenceOptions {
    kind?: TraversalKind;
    bind?: string;
}
export declare class NodeCompiler extends CompiledFunction<["data", "ctx"]> {
    path: string[];
    discriminants: Discriminant[];
    traversalKind: TraversalKind;
    constructor(traversalKind: TraversalKind);
    invoke(node: BaseNode | NodeId, opts?: InvokeOptions): string;
    referenceToId(id: NodeId, opts?: ReferenceOptions): string;
    requiresContextFor(node: BaseNode): boolean;
    initializeErrorCount(): this;
    returnIfFail(): this;
    returnIfFailFast(): this;
    traverseKey(keyExpression: string, accessExpression: string, node: BaseNode): this;
    check(node: BaseNode, opts?: InvokeOptions): this;
}
