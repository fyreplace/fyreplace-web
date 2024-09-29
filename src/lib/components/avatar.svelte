<script lang="ts">
	import { t } from 'i18next';
	import type { User } from '$lib/openapi/generated';

	export let user: User | null = null;
	export let size: number;
	export let tinted = false;
	let tint: string;

	$: tint =
		tinted && user != null ? `rgb(${user.tint.r}, ${user.tint.g}, ${user.tint.b})` : '#7f7f7f3f';
</script>

{#if user?.avatar}
	<img
		src={user.avatar}
		alt={user.username}
		width={size}
		height={size}
		title={t('components.avatar')}
		class="avatar"
	/>
{:else}
	<svg width={size} height={size} viewBox="0 0 16 16" class="plagman">
		<circle cx="8" cy="8" r="8" fill={tint} />
		<rect x="6" y="2" width="4" height="4" />
		<rect x="7" y="5" width="2" height="6" />
		<rect x="4" y="7" width="8" height="1" />
		<rect x="6" y="7" width="1" height="7" />
		<rect x="9" y="7" width="1" height="7" />
		<rect x="6" y="7" width="4" height="4" />
	</svg>
{/if}

<style lang="scss">
	.avatar {
		border-radius: 50%;
		object-fit: cover;
	}

	.plagman {
		fill: white;
	}
</style>
