<script lang="ts">
  import {
    message,
    buttonLabel,
    buttonAction,
    isButtonDisabled,
    isButtonLoading
  } from '$lib/stores/snackbar';
  import Button from '$lib/components/button.svelte';
</script>

<div class="snackbar">
  <span class="message">{$message}</span>
  {#if $buttonLabel}
    <Button disabled={$isButtonDisabled} loading={$isButtonLoading} on:click={$buttonAction}>
      {$buttonLabel}
    </Button>
  {/if}
</div>

<style lang="scss">
  @import '../lib/style/global';

  .snackbar {
    @include flex(row, $align: center);
    @include shadow;
    max-width: var(--display-small-max-size);
    margin: 0 auto;
    padding: var(--gap-medium);
    border-radius: var(--border-radius);
  }

  .message {
    display: inline-flex;
    flex: 1;
  }
</style>
