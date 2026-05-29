import { assertIsYotpoWidgetInstanceId } from "./assertions";
import {
  AppKey,
  WidgetDataContext,
  YotpoDataContext,
  YotpoWidgetsContainer,
} from "../types";

/**
 * Retrieves the app key by finding the longest key in the guids object,
 * which is expected to be the app key guid. The YotpoWidgetsContainer
 * structure may contain other guids that are not app keys, and we need
 * to identify which one is the app key guid to create the YotpoDataContext
 * correctly.
 */
function findAppKeyGuid(guids: Array<string>) {
  return guids.reduce((longestKey, currentKey) => {
    return currentKey.length > longestKey.length ? currentKey : longestKey;
  }, "") as AppKey;
}

/**
 * Creates an array of WidgetDataContext objects from a given guid instance
 * in the YotpoWidgetsContainer.
 */
export function createWidgetDataContexts(
  guidInstance: YotpoWidgetsContainer["guids"][string],
): Array<WidgetDataContext> {
  const { widgets } = guidInstance.config;
  const contexts: Array<WidgetDataContext> = [];
  for (const widgetId in widgets) {
    assertIsYotpoWidgetInstanceId(widgetId);
    const instance = widgets[widgetId];
    const context: WidgetDataContext = {
      appKey: guidInstance.config.data.guid as AppKey,
      widgetId: widgetId,
      className: instance.className,
      customizations: instance.customizations,
      staticContent: instance.staticContent,
    };
    contexts.push(context);
  }
  return contexts;
}

/**
 * Creates a YotpoDataContext from a YotpoWidgetsContainer by extracting
 * the app key and widget data.
 */
export function createYotpoDataContext(
  yotpoWidgetsContainer: YotpoWidgetsContainer,
): YotpoDataContext {
  const { guids } = yotpoWidgetsContainer;
  const guidsKey = Object.keys(guids);
  const appKeyGuidKey = findAppKeyGuid(guidsKey);
  const guidInstance = guids[appKeyGuidKey];
  const yotpoDataContext: YotpoDataContext = {
    appKey: appKeyGuidKey as AppKey,
    widgets: createWidgetDataContexts(guidInstance),
  };
  return yotpoDataContext;
}
