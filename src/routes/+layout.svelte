<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { isCurrentPageTopLevel } from '$lib/stores/page';
  import { contentScroll } from '$lib/stores/scroll';
  import favicon from '$lib/assets/favicon.svg';
  import faviconIco from '$lib/assets/favicon.ico';
  import faviconAt16x16 from '$lib/assets/favicon-16x16.png';
  import faviconAt32x32 from '$lib/assets/favicon-32x32.png';
  import faviconAppleTouch from '$lib/assets/apple-touch-icon.png';
  import faviconMask from '$lib/assets/mask-favicon.svg';
  import Navigation from './navigation.svelte';
  import Toolbar from './toolbar.svelte';

  let content: HTMLElement;
</script>

<svelte:head>
  {#if $page.data.title}
    <title>{$page.data.title}</title>
  {/if}
  <link rel="icon" type="image/svg+xml" sizes="any" href={favicon} />
  <link rel="icon" type="image/png" sizes="32x32" href={faviconAt32x32} />
  <link rel="icon" type="image/png" sizes="16x16" href={faviconAt16x16} />
  <link rel="icon" type="image/x-icon" sizes="32x32 16x16" href={faviconIco} />
  <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={faviconAppleTouch} />
  <link
    rel="apple-touch-icon-precomposed"
    type="image/png"
    sizes="180x180"
    href={faviconAppleTouch}
  />
  <link rel="mask-icon" type="image/svg" href={faviconMask} color="coral" />
</svelte:head>

<div class="layout">
  <Toolbar />
  <div class="content-wrapper">
    {#if $isCurrentPageTopLevel}
      <div data-testid="navigation-side">
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
    <div data-testid="navigation-bottom" transition:slide>
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
    font-family: sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  :global(body) {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
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

  .content-wrapper,
  .content {
    height: 100%;
    flex: 1;
  }

  .content-wrapper {
    @include flex(row);
    overflow: hidden;
  }

  .content {
    @include flex(column);
    overflow: auto;
  }
</style>
