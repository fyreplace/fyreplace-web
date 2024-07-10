<script lang="ts">
	export let size = '1.5em';
</script>

<svg width={size} height={size} viewBox="0 0 240 240" class="icon">
	<slot />
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
