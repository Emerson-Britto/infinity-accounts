let TIME = 0;

export function asyncTimeOut(
  fn: () => Promise<any>,
  milliseconds: number
): any {
  const promise = new Promise(function (resolve) {
    clearTimeout(TIME);
    TIME = window.setTimeout(function () {
      resolve(fn());
    }, milliseconds);
  });
  return promise;
}
