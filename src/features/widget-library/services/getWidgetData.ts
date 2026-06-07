import { executeScriptInMainWorld } from "../../../services/chrome/executeScript";
import { WidgetInstanceId } from "../../../types";

export async function getReviewsWidgetData(instanceId: WidgetInstanceId) {
  function querySelectData(widgetInstanceId: WidgetInstanceId) {
    const result = {
      isInstalled: false as boolean,
      productId: null as string | null,
      productName: null as string | null,
      productUrl: null as string | null,
      productImageUrl: null as string | null,
    };
    const element = document.querySelector(
      `.yotpo-widget-instance[data-yotpo-instance-id="${widgetInstanceId}"]`,
    );
    if (!element) {
      return result;
    }
    result.isInstalled = true;
    result.productId = element.getAttribute("data-yotpo-product-id");
    result.productName = element.getAttribute("data-yotpo-name");
    result.productUrl = element.getAttribute("data-yotpo-url");
    result.productImageUrl = element.getAttribute("data-yotpo-image-url");
    return result;
  }
  return executeScriptInMainWorld(querySelectData, instanceId);
}

export async function getStarRatingsWidgetData(instanceId: WidgetInstanceId) {
  function querySelectData(widgetInstanceId: WidgetInstanceId) {
    const result = {
      isInstalled: false as boolean,
    };
    const element = document.querySelector(
      `.yotpo-widget-instance[data-yotpo-instance-id="${widgetInstanceId}"]`,
    );
    if (!element) {
      return result;
    }
    result.isInstalled = true;
    return result;
  }
  return executeScriptInMainWorld(querySelectData, instanceId);
}
