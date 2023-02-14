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
  <Link href="/feed">
    <span class="link">
      <FeedIcon />
      <span>Feed</span>
    </span>
  </Link>
  <Link href="/notifications" disabled={!$isAuthenticated}>
    <span class="link">
      <NotificationsIcon />
      <span>Notifications</span>
    </span>
  </Link>
  <Link href="/archive" disabled={!$isAuthenticated}>
    <span class="link">
      <ArchiveIcon />
      <span>Archive</span>
    </span>
  </Link>
  <Link href="/drafts" disabled={!$isAuthenticated}>
    <span class="link">
      <DraftsIcon />
      <span>Drafts</span>
    </span>
  </Link>
  <Link href="/settings">
    <span class="link">
      <SettingsIcon />
      <span>Settings</span>
    </span>
  </Link>
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

  .link {
    @include flex(column, center, center);
    gap: var(--gap-tiny);
    color: var(--color-text);
    font-size: 0.75em;
  }
</style>
