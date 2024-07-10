<script lang="ts">
	import { browser } from '$app/environment';
	import { Destination } from '$lib/destinations';
	import { navigateTo } from '$lib/stores/destinations';
	import { isAuthenticated } from '$lib/stores/authentication';

	$: {
		if (!$isAuthenticated && browser) {
			navigateTo(Destination.Login);
		}
	}
</script>

<div class="destination">Settings</div>

<style lang="scss">
	.destination {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
