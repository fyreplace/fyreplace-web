<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { isUpdateAvailable, isUpdating, commitUpdate } from '$lib/stores/updates';
  import { isCurrentPageTopLevel } from '$lib/stores/page';
  import { contentScroll } from '$lib/stores/scroll';
  import {
    isVisible as isSnackbarVisible,
    message as snackbarMessage,
    buttonLabel as snackbarButtonLabel,
    buttonAction as snackbarButtonAction,
    isButtonLoading as isSnackbarButtonLoading
  } from '$lib/stores/snackbar';
  import Navigation from './navigation.svelte';
  import Toolbar from './toolbar.svelte';
  import Snackbar from './snackbar.svelte';

  let content: HTMLElement;

  $: {
    if ($isUpdateAvailable) {
      $isSnackbarVisible = true;
      $snackbarMessage = 'A new version is available';
      $snackbarButtonLabel = 'Update';
      $snackbarButtonAction = commitUpdate;
      $isSnackbarButtonLoading = $isUpdating;
    }
  }
</script>

<svelte:head>
  {#if $page.data.title}
    <title>{$page.data.title}</title>
  {/if}
</svelte:head>

<div class="layout">
  <Toolbar />
  <div class="content-wrapper">
    {#if $isCurrentPageTopLevel}
      <div class="vertical-navigation" data-testid="navigation-side">
        <Navigation vertical />
      </div>
    {/if}
    <main
      class="content"
      class:avoid-bottom={!$isCurrentPageTopLevel}
      bind:this={content}
      on:scroll={() => ($contentScroll = content.scrollTop)}
    >
      <slot />
    </main>
    {#if $isSnackbarVisible}
      <div class="snackbar-container" class:avoid-bottom={!$isCurrentPageTopLevel} transition:slide>
        <Snackbar />
      </div>
    {/if}
  </div>
  {#if $isCurrentPageTopLevel}
    <div data-testid="navigation-bottom">
      <Navigation />
    </div>
  {/if}
</div>

<style lang="scss">
  @import '../lib/style/global';

  :global(:root) {
    --gap-tiny: 0.25rem;
    --gap-small: 0.5rem;
    --gap-medium: 1rem;
    --gap-large: 1.5rem;
    --border-radius: 0.5rem;
    --display-small-max-size: #{$display-small-max-size};
    --display-large-min-size: #{$display-large-min-size};

    --color-accent: coral;
    --color-accent-highlight: #ffbf7f2f;
    --color-on-accent: white;
    --color-background: white;
    --color-on-background-primary: black;
    --color-on-background-secondary: #3f3f3f;
    --color-on-background: var(--color-on-background-primary);
    --color-surface: #efefef;
    --color-border: #7f7f7f7f;
    --color-highlight: #7f7f7f3f;
    --color-yes: forestgreen;
    --color-yes-highlight: #7fff7f2f;
    --color-no: crimson;
    --color-no-highlight: #ff7f7f2f;

    @media (prefers-color-scheme: dark) {
      --color-accent-highlight: #ffbf7f2f;
      --color-background: black;
      --color-on-background-primary: white;
      --color-on-background-secondary: #bfbfbf;
      --color-surface: #1f1f1f;
      --color-highlight: #7f7f7f3f;
      --color-yes: mediumseagreen;
      --color-yes-highlight: #7fff7f2f;
      --color-no: indianred;
      --color-no-highlight: #ff7f7f2f;
    }

    background: var(--color-background);
    color: var(--color-on-background);
  }

  :global(:root),
  :global(body) {
    @include greedy;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;

    font-family: sans-serif;
    accent-color: var(--color-accent);
    -webkit-tap-highlight-color: transparent;
  }

  :global(a) {
    color: var(--color-accent);
  }

  .layout {
    @include flex(column);
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .vertical-navigation {
    overflow: auto;
  }

  .content-wrapper {
    @include flex(row);
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .content {
    @include flex(column);
    flex: 1;
    padding-right: calc(env(safe-area-inset-right));
    overflow: auto;
    transition: padding 0.3s;

    @media screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      padding-bottom: env(safe-area-inset-bottom);
    }

    @media not screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      padding-left: env(safe-area-inset-left);
    }

    &.avoid-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  .snackbar-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: var(--gap-medium);
    box-sizing: border-box;
    transition: padding 0.3s;

    &.avoid-bottom {
      padding-bottom: max(env(safe-area-inset-bottom), var(--gap-medium));
    }
  }
</style>
