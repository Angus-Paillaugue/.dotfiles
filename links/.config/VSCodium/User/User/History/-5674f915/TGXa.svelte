<script context="module">
	import {
		pre,
		img,
		a,
		table,
		blockquote,
		h1
	} from "./index.js";

	export {
		pre,
		img,
		a,
		table,
		blockquote,
		h1
	};
</script>

<script>
	const {props} = $props();
	console.log(props);

</script>

<slot />
