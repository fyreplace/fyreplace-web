<script lang="ts">
  import { isAuthenticated } from '$lib/stores/me';
  import Link from './(top-navigation)/link.svelte';
</script>

<nav class="navigation">
  <Link href="/feed">Feed</Link>
  <Link href="/notifications" disabled={!$isAuthenticated}>Notifications</Link>
  <Link href="/archive" disabled={!$isAuthenticated}>Archive</Link>
  <Link href="/drafts" disabled={!$isAuthenticated}>Drafts</Link>
  <Link href="/settings">Settings</Link>
</nav>

<style lang="scss">
  @import '../lib/style/global';

  .navigation {
    @include flex(row, $justify: space-between);
    width: 100%;
    gap: var(--gap);
    padding: var(--gap);
    box-sizing: border-box;
  }
</style>
