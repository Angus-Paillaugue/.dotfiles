<script lang="ts">
	import { box } from "svelte-toolbelt";
	import type { ContextMenuRootProps } from "../types.js";
	import FloatingLayer from "../../utilities/floating-layer/components/floating-layer.svelte";
	import { noop } from "../../../internal/noop.js";
	import { useMenuMenu, useMenuRoot } from "../../menu/menu.svelte.js";

	let {
		open = $bindable(false),
		dir = "ltr",
		onOpenChange = noop,
		controlledOpen = false,
		children,
	}: ContextMenuRootProps = $props();

	const root = useMenuRoot({
		variant: box.with(() => "context-menu"),
		dir: box.with(() => dir),
		onClose: () => {
			if (controlledOpen) {
				onOpenChange(false);
			} else {
				open = false;
				onOpenChange?.(false);
			}
		},
	});

	useMenuMenu(root, {
		open: box.with(
			() => open,
			(v) => {
				if (controlledOpen) {
					onOpenChange(v);
				} else {
					open = v;
					onOpenChange(v);
				}
			}
		),
	});
</script>

<FloatingLayer>
	{@render children?.()}
</FloatingLayer>
