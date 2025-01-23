interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const CollapsibleContent: $$__sveltets_2_IsomorphicComponent<Omit<{
    forceMount?: boolean;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[import("../types.js").CollapsibleContentSnippetProps & {
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet;
    style?: import(".pnpm/bits-ui@1.0.0-next.67_svelte@5.8.1/node_modules/bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import(".pnpm/bits-ui@1.0.0-next.67_svelte@5.8.1/node_modules/bits-ui").Without<import(".pnpm/bits-ui@1.0.0-next.67_svelte@5.8.1/node_modules/bits-ui").BitsPrimitiveDivAttributes, import("../types.js").CollapsibleContentPropsWithoutHTML> & {
    forceMount?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "ref">;
type CollapsibleContent = InstanceType<typeof CollapsibleContent>;
export default CollapsibleContent;
