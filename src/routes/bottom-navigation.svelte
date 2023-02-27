<script lang="ts">
  import { isAuthenticated } from '$lib/stores/me';
  import Icon from '$lib/components/icon.svelte';
  import Home from '$lib/components/icons/home.svelte';
  import Bell from '$lib/components/icons/bell.svelte';
  import History from '$lib/components/icons/history.svelte';
  import Document from '$lib/components/icons/document.svelte';
  import Person from '$lib/components/icons/person.svelte';
  import Link from './(bottom-navigation)/link.svelte';
</script>

<nav class="navigation">
  <Link href="/feed">
    <span class="link">
      <Icon><Home /></Icon>
      <span>Feed</span>
    </span>
  </Link>
  <Link href="/notifications" disabled={!$isAuthenticated}>
    <span class="link">
      <Icon><Bell /></Icon>
      <span>Notifications</span>
    </span>
  </Link>
  <Link href="/archive" disabled={!$isAuthenticated}>
    <span class="link">
      <Icon><History /></Icon>
      <span>Archive</span>
    </span>
  </Link>
  <Link href="/drafts" disabled={!$isAuthenticated}>
    <span class="link">
      <Icon><Document /></Icon>
      <span>Drafts</span>
    </span>
  </Link>
  <Link href="/settings">
    <span class="link">
      <Icon><Person /></Icon>
      <span>Settings</span>
    </span>
  </Link>
</nav>

<style lang="scss">
  @import '../lib/style/global';

  .navigation {
    @include flex(row, $justify: space-evenly);
    width: 100%;
    border-top: 1px solid var(--color-border);
  }

  .link {
    @include flex(column, center, center, var(--gap-tiny));
    padding: var(--gap-small) 0;
    color: var(--color-text);
    font-size: 0.75em;

    @media screen and (min-width: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      flex-direction: row;
      gap: var(--gap-small);
      font-size: unset;
    }

    @media screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      padding: var(--gap-medium) 0;
    }
  }
</style>
