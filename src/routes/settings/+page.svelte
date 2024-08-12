<script lang="ts">
	import { t } from 'i18next';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Destination } from '$lib/destinations';
	import { isAuthenticated } from '$lib/authentication';

	if (!$isAuthenticated && browser) {
		goto(Destination.Login.route, { replaceState: true });
	}
</script>

{#if $isAuthenticated}
	<div class="destination">
		{t('destinations.settings')}
	</div>
{/if}

<style lang="scss">
	.destination {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
