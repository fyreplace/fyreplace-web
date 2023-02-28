<script lang="ts">
  import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { isContentScrolled } from '$lib/stores/scroll';

  let fontSize = derived(isContentScrolled, ($isContentScrolled) =>
    $isContentScrolled ? '1.25em' : ''
  );
</script>

{#key $page.url}
  <h1 class="title" style:font-size={$fontSize}>{browser ? document.title : '\u00A0'}</h1>
{/key}

<style lang="scss">
  .title {
    transition: 0.3s;
  }
</style>
