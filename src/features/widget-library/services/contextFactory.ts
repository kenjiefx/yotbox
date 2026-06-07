import { assertIsYotpoWidgetInstanceId } from "../../../services/assertions";
import {
  AppKey,
  PromotedProductsWidgetInstance,
  ReviewsCarouselWidgetInstance,
  ReviewsMainWidgetInstance,
  ReviewsStarRatingsWidgetInstance,
  WidgetInstanceId,
  YotpoWidgetsContainer,
} from "../../../types";

/**
 * Creates an array of WidgetDataContext objects from a given guid instance
 * in the YotpoWidgetsContainer.
 */
export default async function createWidgetDataContexts(
  guidInstance: YotpoWidgetsContainer["guids"][string],
  getReviewsWidgetData: (widgetId: WidgetInstanceId) => Promise<{
    isInstalled: boolean;
    productId: string | null;
    productName: string | null;
    productUrl: string | null;
    productImageUrl: string | null;
  }>,
  getStarRatingsWidgetData: (widgetId: WidgetInstanceId) => Promise<{
    isInstalled: boolean;
  }>,
): Promise<
  Array<
    | ReviewsMainWidgetInstance
    | ReviewsStarRatingsWidgetInstance
    | PromotedProductsWidgetInstance
    | ReviewsCarouselWidgetInstance
  >
> {
  const { widgets } = guidInstance.config;
  const results: Array<
    | ReviewsMainWidgetInstance
    | ReviewsStarRatingsWidgetInstance
    | PromotedProductsWidgetInstance
    | ReviewsCarouselWidgetInstance
  > = [];
  for (const widgetId in widgets) {
    assertIsYotpoWidgetInstanceId(widgetId);
    const instance = widgets[widgetId];
    if (instance.className === "ReviewsMainWidget") {
      const widgetData = await getReviewsWidgetData(widgetId);
      const context: ReviewsMainWidgetInstance = {
        appKey: guidInstance.config.data.guid as AppKey,
        widgetId: widgetId,
        className: instance.className,
        customizations: instance.customizations,
        staticContent: instance.staticContent,
        installed: widgetData.isInstalled,
        widgetName: "ReviewsMainWidget",
        productId: widgetData.productId ?? "",
        productName: widgetData.productName ?? "",
        productUrl: widgetData.productUrl ?? "",
        productImageUrl: widgetData.productImageUrl ?? "",
      };
      results.push(context);
    } else if (instance.className === "ReviewsStarRatingsWidget") {
      const widgetData = await getStarRatingsWidgetData(widgetId);
      const context: ReviewsStarRatingsWidgetInstance = {
        appKey: guidInstance.config.data.guid as AppKey,
        widgetId: widgetId,
        className: instance.className,
        customizations: instance.customizations,
        staticContent: instance.staticContent,
        installed: widgetData.isInstalled,
        widgetName: "ReviewsStarRatingsWidget",
      };
      results.push(context);
    } else if (instance.className === "PromotedProductsWidget") {
      const context: PromotedProductsWidgetInstance = {
        appKey: guidInstance.config.data.guid as AppKey,
        widgetId: widgetId,
        className: instance.className,
        customizations: instance.customizations,
        staticContent: instance.staticContent,
        installed: false,
        widgetName: "PromotedProductsWidget",
      };
      results.push(context);
    } else if (instance.className === "ReviewsCarouselWidget") {
      const context: ReviewsCarouselWidgetInstance = {
        appKey: guidInstance.config.data.guid as AppKey,
        widgetId: widgetId,
        className: instance.className,
        customizations: instance.customizations,
        staticContent: instance.staticContent,
        installed: false,
        widgetName: "ReviewsCarouselWidget",
      };
      results.push(context);
    } else {
    }
  }

  return results;
}
