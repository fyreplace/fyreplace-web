<script lang="ts">
  import { isAuthenticated } from '$lib/stores/me';
  import Icon from '$lib/components/icon.svelte';
  import Home from '$lib/components/icons/home.svelte';
  import Bell from '$lib/components/icons/bell.svelte';
  import History from '$lib/components/icons/history.svelte';
  import Document from '$lib/components/icons/document.svelte';
  import Person from '$lib/components/icons/person.svelte';
  import Link from './(navigation)/link.svelte';

  export let vertical = false;
</script>

<nav class="navigation" class:vertical>
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
    &.vertical {
      @include flex(column, $gap: var(--gap-small));
      padding: var(--gap-small);
      height: 100%;
      border-inline-end: 1px solid var(--color-border);
    }

    &:not(.vertical) {
      @include flex(row, $justify: space-evenly);
      width: 100%;
      border-block-start: 1px solid var(--color-border);
    }

    @media screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      &:not(.vertical) {
        display: none;
      }
    }

    @media not screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      &.vertical {
        display: none;
      }
    }
  }

  .link {
    @include flex(column, center, center, var(--gap-tiny));
    padding: var(--gap-small) 0;
    color: var(--color-text);
    font-size: 0.75em;

    @media screen and (min-aspect-ratio: 1/1) {
      flex-direction: row;
      gap: var(--gap-small);

      @media (min-width: #{$display-large-min-size}) {
        font-size: unset;
      }
    }

    .vertical & {
      width: 100%;
      padding: var(--gap-medium) var(--gap-medium);
      justify-content: initial;
      gap: var(--gap-medium);
      border-radius: var(--border-radius);
      transition: 0.3s;

      &:hover {
        background: var(--color-highlight);
      }
    }
  }
</style>
