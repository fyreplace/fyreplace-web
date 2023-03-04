import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const isCurrentPageTopLevel = derived(page, ($page) => {
  const urlPathParts = $page.route.id?.split('/').filter((part) => part) ?? [];
  return urlPathParts.length <= 1;
});
