<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		size?: string;
		children: Snippet;
	}

	let { size = '24px', children }: Props = $props();
</script>

<svg width={size} height={size} viewBox="0 0 240 240" class="icon">
	{@render children()}
</svg>

<style lang="scss">
	.icon {
		overflow: visible;
		fill: none;
		stroke: currentColor;
		stroke-width: 20;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
