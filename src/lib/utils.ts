export function doOnEnterPressed(action: Function) {
  return function (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      action();
    }
  };
}
