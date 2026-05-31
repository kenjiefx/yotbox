import { ReactNode, useState, useEffect } from "react";
import { AppKey, YotpoWidgetsContainer } from "../../types";
import { YotpoWidgetContainerContext } from "./YotpoWidgetContainerContext";
import { assertIsYotpoWidgetsContainer } from "./assertions";
import { executeScriptInMainWorld } from "../../services/chrome/executeScript";

export function ExtensionWidgetContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<YotpoWidgetsContainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const retrieveWidgetContainer = () => {
    if (!("yotpoWidgetsContainer" in window)) {
      throw new Error("yotpoWidgetsContainer is not defined");
    }
    const yotpoWidgetsContainer = window.yotpoWidgetsContainer;
    if (
      typeof yotpoWidgetsContainer !== "object" ||
      yotpoWidgetsContainer === null
    ) {
      throw new Error("yotpoWidgetsContainer is not an object");
    }
    const installationReport: YotpoWidgetsContainer["installationReport"] = {
      ReviewsStarRatingsWidget: {
        installed: false,
      },
      ReviewsMainWidget: {
        installed: false,
        productId: "",
      },
    };

    const yotpoWidgetInstances = document.querySelectorAll(
      ".yotpo-widget-instance",
    );
    yotpoWidgetInstances.forEach((instance) => {
      // if has children with id yotpo-reviews-star-ratings-widget
      if (instance.querySelector("#yotpo-reviews-star-ratings-widget")) {
        installationReport.ReviewsStarRatingsWidget.installed = true;
        return;
      }
      if (instance.querySelector("#yotpo-reviews-main-widget")) {
        installationReport.ReviewsMainWidget.installed = true;
        installationReport.ReviewsMainWidget.productId =
          instance.getAttribute("data-yotpo-product-id") || "";
        return;
      }
    });

    // @ts-expect-error add installationReport field to the yotpoWidgetsContainer object
    yotpoWidgetsContainer.installationReport = installationReport;
    return yotpoWidgetsContainer;
  };

  const fetchFromWindow = async () => {
    setLoading(true);
    try {
      const fetchedData = await executeScriptInMainWorld(
        retrieveWidgetContainer,
      );
      assertIsYotpoWidgetsContainer(fetchedData);
      setData(fetchedData || null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch Yotpo container");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFromWindow();
  }, []);

  return (
    <YotpoWidgetContainerContext.Provider
      value={{ data, loading, error, refresh: fetchFromWindow }}
    >
      {children}
    </YotpoWidgetContainerContext.Provider>
  );
}
