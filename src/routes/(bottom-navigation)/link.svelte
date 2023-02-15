<script lang="ts">
  import { setClassOnHref } from '$lib/actions/set-class-on-href';

  export let href: string;
  export let disabled = false;
</script>

<a {href} class="link" class:disabled use:setClassOnHref={{ href, className: 'active' }}>
  <slot />
</a>

<style lang="scss">
  @import '../../lib/style/global';

  .link {
    @include flex(row, $justify: center, $align: center);
    width: 100%;
    padding: var(--gap-small) 0;
    outline: none;
    text-decoration: none;

    &.disabled {
      pointer-events: none;
      opacity: 50%;
    }

    &:global(.active) {
      --color-text: var(--color-accent);
    }
  }
</style>
