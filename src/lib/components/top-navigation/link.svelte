<script lang="ts">
  import { setClassActiveOnHref } from '$lib/actions/set-class-active-on-href';

  export let href: string;
  export let disabled = false;
</script>

<a {href} class="link" use:setClassActiveOnHref={href} class:disabled><slot /></a>

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
