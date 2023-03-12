<script lang="ts">
  import { page } from '$app/stores';
  import { isCurrentPageTopLevel } from '$lib/stores/page';
  import { contentScroll } from '$lib/stores/scroll';
  import Navigation from './navigation.svelte';
  import Toolbar from './toolbar.svelte';

  let content: HTMLElement;
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
      bind:this={content}
      on:scroll={() => ($contentScroll = content.scrollTop)}
    >
      <slot />
    </main>
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
    --color-on-accent: white;
    --color-text-primary: black;
    --color-text-secondary: #3f3f3f;
    --color-text: var(--color-text-primary);
    --color-border: #7f7f7f7f;
    --color-yes: forestgreen;
    --color-no: crimson;
    --color-highlight: #7f7f7f3f;
    --color-yes-highlight: #7fff7f2f;
    --color-no-highlight: #ff7f7f2f;

    @media (prefers-color-scheme: dark) {
      --color-text-primary: white;
      --color-text-secondary: #bfbfbf;
      --color-yes: mediumseagreen;
      --color-no: indianred;
      --color-highlight: #7f7f7f2f;
      --color-yes-highlight: #7fff7f1f;
      --color-no-highlight: #ff7f7f1f;
    }
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
    height: 100%;
    overflow: hidden;
  }

  .content {
    @include flex(column);
    flex: 1;
    padding-right: calc(env(safe-area-inset-right));
    overflow: auto;

    @media screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      padding-bottom: env(safe-area-inset-bottom);
    }

    @media not screen and (min-height: #{$display-large-min-size}) and (min-aspect-ratio: 1/1) {
      padding-left: env(safe-area-inset-left);
    }
  }
</style>
