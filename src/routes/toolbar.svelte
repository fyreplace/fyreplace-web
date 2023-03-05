<script lang="ts">
  import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { isCurrentPageTopLevel } from '$lib/stores/page';
  import { isContentScrolled } from '$lib/stores/scroll';
  import BackButton from './(toolbar)/back-button.svelte';

  const title = derived(
    page,
    ($page) => $page.data.title || (browser ? document.title : null) || 'Error'
  );
</script>

<div class="toolbar" class:has-back-button={!$isCurrentPageTopLevel}>
  {#if !$isCurrentPageTopLevel}
    <BackButton />
  {/if}
  <h1 class="title" class:small-text={$isContentScrolled}>{$title}</h1>
</div>

<style lang="scss">
  @import '../lib/style/global.scss';

  .toolbar {
    @include flex(row, $align: center, $gap: var(--gap-small));
    padding-top: env(safe-area-inset-top);
    padding-left: calc(env(safe-area-inset-left) + var(--gap-medium));
    padding-right: calc(env(safe-area-inset-right) + var(--gap-medium));
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);

    &.has-back-button {
      padding-left: calc(env(safe-area-inset-left) + var(--gap-small));
    }
  }

  @media not screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
    .title {
      font-size: 1.5em;
      transition: 0.3s;

      &.small-text {
        font-size: 1.15em;
      }
    }
  }
</style>
