<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		header?: Snippet;
		body: Snippet;
	}

	let { header, body }: Props = $props();
</script>

<table class="list">
	<thead>
		{@render header?.()}
	</thead>
	<tbody>
		{@render body()}
	</tbody>
</table>

<style lang="scss">
	@use '$lib/style/mixins';

	@mixin borders {
		:global(tr:first-child td) {
			border-top: 2px solid var(--color-border);
		}

		:global(tr:last-child td) {
			border-bottom: 2px solid var(--color-border);
		}

		:global(tr td:first-child) {
			border-left: 2px solid var(--color-border);
		}

		:global(tr td:last-child) {
			border-right: 2px solid var(--color-border);
		}
	}

	.list {
		width: 100%;
		border-radius: 1em;
		border-spacing: 0;

		@include mixins.expanded-width {
			width: unset;
			min-width: 600px;
		}

		thead {
			font-weight: bold;

			:global(td) {
				padding: 1em;
				border-bottom: 1px solid var(--color-border);

				@include mixins.expanded-width {
					border-bottom: unset;
				}
			}
		}

		tbody {
			@include mixins.expanded-width {
				@include borders;
			}

			:global(tr:not(:last-child) td) {
				border-bottom: 1px solid var(--color-border);
			}

			:global(tr:first-child td:first-child) {
				border-top-left-radius: 1em;
			}

			:global(tr:first-child td:last-child) {
				border-top-right-radius: 1em;
			}

			:global(tr:last-child td:first-child) {
				border-bottom-left-radius: 1em;
			}

			:global(tr:last-child td:last-child) {
				border-bottom-right-radius: 1em;
			}

			:global(td) {
				padding: 1em;
			}

			:global(td:last-child:not(:first-child)) {
				text-align: right;
			}
		}
	}
</style>
