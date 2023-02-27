<script lang="ts">
  import Icon from './icon.svelte';
  import Person from './icons/person.svelte';

  export let src: string | undefined = undefined;
  export let size: number;
</script>

{#if src}
  <img {src} width={size} height={size} alt="Avatar" class="avatar" />
{:else}
  <Icon {size}><Person /></Icon>
{/if}

<style lang="scss">
  .avatar {
    border-radius: 50%;
    object-fit: cover;
    transition: 0.3s;
  }
</style>
