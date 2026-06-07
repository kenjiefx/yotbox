import { AppKey } from "../types";

/**
 * Retrieves the app key by finding the longest key in the guids object,
 * which is expected to be the app key guid. The YotpoWidgetsContainer
 * structure may contain other guids that are not app keys, and we need
 * to identify which one is the app key guid to create the YotpoDataContext
 * correctly.
 */
export function findAppKeyGuid(guids: Array<string>) {
  return guids.reduce((longestKey, currentKey) => {
    return currentKey.length > longestKey.length ? currentKey : longestKey;
  }, "") as AppKey;
}
