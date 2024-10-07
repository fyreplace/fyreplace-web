<script lang="ts">
	import type { User } from '$lib/openapi/generated';
	import Avatar from '$lib/components/avatar.svelte';
	import ImagePicker from '$lib/components/inputs/image-picker.svelte';
	import Icon from '$lib/components/icon.svelte';
	import EditIcon from '$lib/components/icons/edit.svelte';

	export let user: User | null = null;
</script>

<ImagePicker on:file>
	<Avatar {user} size={100} />
	<span class="edit-icon">
		<Icon size="32px"><EditIcon /></Icon>
	</span>
</ImagePicker>

<style lang="scss">
	.edit-icon {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: white;
		background: #0000007f;
		backdrop-filter: blur(1px);
		cursor: pointer;
		transition: 0.1s;

		@media (hover: none) {
			display: none;
		}

		&:not(:hover) {
			opacity: 0;
		}
	}
</style>
