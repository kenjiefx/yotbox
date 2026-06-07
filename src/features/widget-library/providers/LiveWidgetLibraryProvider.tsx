import { useState, useEffect } from "react";
import { findAppKeyGuid } from "../../../services/findAppKeyGuid";
import {
  WidgetLibraryServiceInterface,
  WidgetInstanceId,
} from "../../../types";
import { useYotpoWidgetContainer } from "../../yotpo-widget-container/hooks/useYotpoWidgetContainer";
import { WidgetLibraryContext } from "../context";
import createWidgetDataContexts from "../services/contextFactory";
import {
  getReviewsWidgetData,
  getStarRatingsWidgetData,
} from "../services/getWidgetData";

export default function LiveWidgetLibraryProvider({
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
    createWidgetDataContexts(
      guidInstance,
      getReviewsWidgetData,
      getStarRatingsWidgetData,
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
