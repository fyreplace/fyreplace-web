<script lang="ts">
  import { setClassOnHref } from '$lib/actions/set-class-on-href';

  export let href: string;
  export let disabled = false;
</script>

<a {href} class="link" class:disabled use:setClassOnHref={{ href, className: 'active' }}>
  <slot />
</a>

<style lang="scss">
  @import '../../style/global';

  .link {
    @include flex(row, $align: center);
    height: 3em;
    padding: 0 1em;
    box-sizing: border-box;

    border-radius: var(--border-radius);
    text-decoration: none;
    color: unset;
    transition: 0.1s;

    &:hover:not(.disabled) {
      background: var(--color-highlight);
    }

    &.disabled {
      pointer-events: none;
      opacity: 50%;
    }

    &:global(.active) {
      color: var(--color-accent);
    }
  }
</style>
