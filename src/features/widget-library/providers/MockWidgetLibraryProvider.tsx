import { useEffect, useState } from "react";
import { WidgetLibraryContext } from "../context";
import {
  WidgetInstanceId,
  WidgetLibraryServiceInterface,
} from "../../../types";
import { useYotpoWidgetContainer } from "../../yotpo-widget-container/hooks/useYotpoWidgetContainer";
import createWidgetDataContexts from "../services/contextFactory";
import { findAppKeyGuid } from "../../../services/findAppKeyGuid";

export default function MockWidgetLibraryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [libraryData, setLibraryData] = useState<
    WidgetLibraryServiceInterface["libraryData"]
  >([]);
  const { data } = useYotpoWidgetContainer();

  useEffect(() => {
    if (data === null) {
      setLibraryData([]);
      return;
    }
    const appKeyGuid = findAppKeyGuid(Object.keys(data.guids));
    const guidInstance = data.guids[appKeyGuid];
    async function mockGetReviewsWidgetData(widgetId: WidgetInstanceId) {
      return {
        isInstalled: true,
        productId: "67890123451311",
        productName: "An Great Example Green Bag",
        productUrl: "https://example.com/product/67890123451311",
        productImageUrl: "https://example.com/product/67890123451311/image.jpg",
      };
    }
    async function mockGetStarRatingsWidgetData(widgetId: WidgetInstanceId) {
      return {
        isInstalled: true,
      };
    }
    createWidgetDataContexts(
      guidInstance,
      mockGetReviewsWidgetData,
      mockGetStarRatingsWidgetData,
    ).then((contexts) => {
      setLibraryData(contexts);
    });
  }, [data]);

  return (
    <WidgetLibraryContext.Provider value={{ libraryData, libraryError: null }}>
      {children}
    </WidgetLibraryContext.Provider>
  );
}
