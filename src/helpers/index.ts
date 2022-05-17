export { default as urlEncoding } from "./urlEncoding";

let TIME_xf = 0;
export const debounceTime = async (
  fn: () => Promise<any>,
  mSeconds: number
): Promise<any> => {
  return new Promise((resolve) => {
    clearTimeout(TIME_xf);
    TIME_xf = setTimeout(async () => resolve(await fn()), mSeconds);
  });
};
