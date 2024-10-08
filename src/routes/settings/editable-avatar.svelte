<script lang="ts">
	import { t } from 'i18next';
	import type { User } from '$lib/openapi/generated';
	import Avatar from '$lib/components/avatar.svelte';
	import ImagePicker from '$lib/components/inputs/image-picker.svelte';
	import Icon from '$lib/components/icon.svelte';
	import EditIcon from '$lib/components/icons/edit.svelte';
	import Loader from '$lib/components/inputs/button/loader.svelte';

	export let user: User | null = null;
	export let loading = false;
</script>

<ImagePicker title={t('settings.profile.avatar.change')} on:file>
	<Avatar {user} size={100} />
	<span class="overlay" class:loading>
		{#if loading}
			<Loader />
		{:else}
			<span class="edit-icon">
				<Icon size="32px"><EditIcon /></Icon>
			</span>
		{/if}
	</span>
</ImagePicker>

<style lang="scss">
	.overlay {
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

		&:not(.loading) {
			@media (hover: none) {
				display: none;
			}

			&:not(:hover),
			&:not(:hover) .edit-icon {
				opacity: 0;
			}
		}
	}
</style>
