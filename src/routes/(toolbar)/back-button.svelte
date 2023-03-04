<script>
  import Icon from '$lib/components/icon.svelte';
  import ArrowBack from '$lib/components/icons/arrow-back.svelte';
</script>

<button title="Back" class="back-button" on:click={() => history.back()}>
  <Icon><ArrowBack /></Icon>
</button>

<style lang="scss">
  .back-button {
    padding: var(--gap-small);
    border-radius: 50%;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: var(--color-highlight);
    }
  }
</style>
