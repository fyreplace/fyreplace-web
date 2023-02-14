<script lang="ts">
  import TopNavigation from '$lib/components/top-navigation.svelte';
  import BottomNavigation from '$lib/components/bottom-navigation.svelte';
</script>

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
