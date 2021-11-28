export const debounceTime = (
  milliseconds: number,
  fn: () => Promise<any>
): any => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), milliseconds);
  };
};
