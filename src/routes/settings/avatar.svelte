<script lang="ts" context="module">
  import { derived, writable } from 'svelte/store';
  import { browser } from '$app/environment';

  let displayLargeMinSize = browser
    ? getComputedStyle(document.documentElement).getPropertyValue('--display-large-min-size')
    : '0px';
  let displayLargeMinSurface = Math.pow(parseInt(displayLargeMinSize), 2);
  let windowWidth = writable(0);
  let windowHeight = writable(0);
  let avatarSize = derived([windowWidth, windowHeight], ([$windowWidth, $windowHeight]) => {
    return $windowWidth * $windowHeight > displayLargeMinSurface ? 140 : 100;
  });
</script>

<script lang="ts">
  import Avatar from '$lib/components/avatar.svelte';

  export let src: string | undefined = undefined;
</script>

<svelte:window bind:innerWidth={$windowWidth} bind:innerHeight={$windowHeight} />

<Avatar {src} size={$avatarSize} />
