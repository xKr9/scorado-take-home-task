export function getDeepCopy(arr: unknown[][]) {
  return JSON.parse(JSON.stringify(arr));
}
