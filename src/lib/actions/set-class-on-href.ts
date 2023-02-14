import { page } from '$app/stores';

export function setClassOnHref(
  node: HTMLAnchorElement,
  { href, className }: { href: string; className: string }
) {
  const unsubscribe = page.subscribe(($page) => {
    if ($page.route.id === href) {
      node.classList.add(className);
    } else {
      node.classList.remove(className);
    }
  });
  return { destroy: unsubscribe };
}
