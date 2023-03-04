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
  const fontSize = derived(isContentScrolled, ($isContentScrolled) =>
    $isContentScrolled ? '1.15em' : '1.5em'
  );
</script>

<div class="toolbar" class:has-back-button={!$isCurrentPageTopLevel}>
  {#if !$isCurrentPageTopLevel}
    <BackButton />
  {/if}
  <h1 class="title" style:font-size={$fontSize}>{$title}</h1>
</div>

<style lang="scss">
  @import '../lib/style/global.scss';

  .toolbar {
    @include flex(row, $align: center, $gap: var(--gap-small));
    padding: 0 var(--gap-medium);
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);

    &.has-back-button {
      padding-inline-start: var(--gap-small);
    }
  }

  .title {
    transition: 0.3s;
  }
</style>
