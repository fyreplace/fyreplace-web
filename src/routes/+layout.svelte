<script lang="ts">
  import favicon from '$lib/assets/favicon.ico';
  import faviconAt16x16 from '$lib/assets/favicon-16x16.png';
  import faviconAt32x32 from '$lib/assets/favicon-32x32.png';
  import faviconAppleTouch from '$lib/assets/apple-touch-icon.png';
  import faviconSafari from '$lib/assets/safari-pinned-tab.svg';
  import TopNavigation from '$lib/components/top-navigation.svelte';
  import BottomNavigation from '$lib/components/bottom-navigation.svelte';
</script>

<svelte:head>
  <link rel="icon" type="image/png" sizes="32x32" href={faviconAt32x32} />
  <link rel="icon" type="image/png" sizes="16x16" href={faviconAt16x16} />
  <link rel="icon" type="image/x-icon" href={favicon} />
  <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={faviconAppleTouch} />
  <link
    rel="apple-touch-icon-precomposed"
    type="image/png"
    sizes="180x180"
    href={faviconAppleTouch}
  />
  <link rel="mask-icon" type="image/svg" href={faviconSafari} color="red" />
</svelte:head>

<div class="layout">
  <div class="display-large">
    <TopNavigation />
  </div>
  <div class="content">
    <slot />
  </div>
  <div class="display-small">
    <BottomNavigation />
  </div>
</div>

<style lang="scss">
  @import '../lib/style/global';

  $display-large-min-width: 720px;

  :global(:root) {
    --gap: 1em;
    --gap-small: 0.5em;
    --gap-tiny: 0.25em;
    --border-radius: 0.5em;
    --app-max-width: unset;

    --color-accent: coral;
    --color-on-accent: white;
    --color-highlight: #7f7f7f3f;
    --color-text: black;
    --color-border: #7f7f7f7f;

    @media (prefers-color-scheme: dark) {
      --color-text: white;
    }

    :global(.display-large) {
      display: none;
    }

    :global(.display-small) {
      display: unset;
    }

    @media screen and (min-width: #{$display-large-min-width}) and (min-height: #{$display-large-min-width}) and (min-aspect-ratio: 1/1) {
      --app-max-width: #{$display-large-min-width};

      :global(.display-large) {
        display: unset;
      }

      :global(.display-small) {
        display: none;
      }
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
    max-width: var(--app-max-width);
    min-height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .content {
    @include flex(column);
    flex: 1;
  }
</style>
