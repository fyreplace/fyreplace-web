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
    @include flex(row, $justify: center, $align: center);
    width: 100%;
    height: 3em;
    outline: none;

    &.disabled {
      pointer-events: none;
      opacity: 50%;
    }

    &:global(.active) {
      --color-text: var(--color-accent);
    }
  }
</style>
