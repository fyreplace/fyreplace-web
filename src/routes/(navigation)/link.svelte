<script lang="ts">
  import { setClassOnHref } from '$lib/actions/set-class-on-href';

  export let href: string;
  export let disabled = false;
</script>

<a {href} class="link" aria-disabled={disabled} use:setClassOnHref={{ href, className: 'active' }}>
  <slot />
</a>

<style lang="scss">
  @import '../../lib/style/global';

  .link {
    @include flex(row, $justify: center, $align: center);
    @include no-select;
    width: 100%;
    outline: none;
    text-decoration: none;

    &[aria-disabled='true'] {
      pointer-events: none;
      opacity: 50%;
    }

    &:global(.active) {
      --color-text: var(--color-accent);
    }
  }
</style>
