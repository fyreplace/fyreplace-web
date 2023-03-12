<script lang="ts">
  import { fade } from 'svelte/transition';
  import Icon from './icon.svelte';
  import Loader from './icons/loader.svelte';

  export let disabled = false;
  export let loading = false;
</script>

<button {disabled} class:loading class="button" on:click>
  <slot />
  {#if loading}
    <span class="loader" transition:fade><Icon><Loader /></Icon></span>
  {/if}
</button>

<style lang="scss">
  @import '../style/global';

  .button {
    @include no-select;
    --color-on-background: var(--color-accent);

    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: var(--gap-small);
    outline: none;
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);

    background: none;
    color: var(--color-accent);
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.3s;
    cursor: pointer;

    &:disabled {
      opacity: 50%;
      cursor: not-allowed;
    }

    &.loading {
      color: transparent;
      pointer-events: none;
    }

    &:hover:not(:disabled) {
      background: var(--color-accent-highlight);
    }

    .loader {
      position: absolute;
      display: inline-flex;
    }
  }
</style>
