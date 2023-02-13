<script lang="ts">
  import { isAuthenticated } from '$lib/stores/me';
  import Link from './bottom-navigation/link.svelte';
  import FeedIcon from './bottom-navigation/feed-icon.svelte';
  import NotificationsIcon from './bottom-navigation/notifications-icon.svelte';
  import ArchiveIcon from './bottom-navigation/archive-icon.svelte';
  import DraftsIcon from './bottom-navigation/drafts-icon.svelte';
  import SettingsIcon from './bottom-navigation/settings-icon.svelte';
</script>

<nav class="navigation">
  <Link href="/feed"><FeedIcon /></Link>
  <Link href="/notifications" disabled={!$isAuthenticated}><NotificationsIcon /></Link>
  <Link href="/archive" disabled={!$isAuthenticated}><ArchiveIcon /></Link>
  <Link href="/drafts" disabled={!$isAuthenticated}><DraftsIcon /></Link>
  <Link href="/settings"><SettingsIcon /></Link>
</nav>

<style lang="scss">
  @import '../style/global';

  .navigation {
    @include flex(row, $justify: space-evenly);
    width: 100%;
    border-top: 1px solid var(--color-border);

    :global(.icon) {
      stroke: var(--color-text);
    }
  }
</style>
