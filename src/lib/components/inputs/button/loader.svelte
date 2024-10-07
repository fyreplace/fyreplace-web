<svg width="30" height="10" viewBox="0 0 30 10" class="loader">
	{#each [0, 1, 2] as i}
		<circle
			cx={i * 10 + 5}
			cy="5"
			r="3"
			class="dot"
			style={`animation-delay:calc(0.5s + ${i / 12}s)`}
		/>
	{/each}
</svg>

<style lang="scss">
	@keyframes bounce {
		0%,
		60% {
			transform: none;
		}

		30% {
			transform: translateY(-30%);
		}
	}

	.loader {
		overflow: visible;
	}

	.dot {
		fill: currentColor;
		animation: bounce 0.5s ease-in-out infinite;
	}
</style>
