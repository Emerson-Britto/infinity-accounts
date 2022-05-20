export { default as urlEncoding } from "./urlEncoding";

interface Obj {
  [key: string]: any;
}

let TIME_ref: any = null;
export const debounceTime = async (
  fn: () => Promise<any>,
  mSeconds: number
): Promise<any> => {
  return new Promise((resolve) => {
    clearTimeout(TIME_ref);
    TIME_ref = setTimeout(async () => resolve(await fn()), mSeconds);
  });
};

export const mapObjValues = (obj: Obj | undefined, type: (s: any) => any) => {
  if (!obj) return {};
  const newObj: Obj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;
    newObj[key] = type(value);
  }

  return newObj;
};

export const createUrlParams = (obj: Obj | undefined): string => {
  if (!obj) return "";
  obj = mapObjValues(obj, (value) => String(value));
  const params: string = new URLSearchParams(obj).toString();
  return params;
};
