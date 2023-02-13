import { page } from '$app/stores';

export function setClassActiveOnHref(node: HTMLAnchorElement, href: string) {
  const unsubscribe = page.subscribe(($page) => {
    if ($page.route.id === href) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });
  return { destroy: unsubscribe };
}
