<script lang="ts">
  export let size = 24;
</script>

<svg width={size} height={size} viewBox="0 0 240 240" class="icon">
  <slot />
</svg>

<style lang="scss">
  .icon {
    overflow: visible;
    stroke: var(--color-on-background);
    transition: 0.3s;
  }
</style>
