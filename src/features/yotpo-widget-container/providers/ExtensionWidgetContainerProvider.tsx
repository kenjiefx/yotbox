import { ReactNode, useState, useEffect } from "react";
import { AppKey, YotpoWidgetsContainer } from "../../../types";
import { YotpoWidgetContainerContext } from "../context";
import { assertIsYotpoWidgetsContainer } from "../assertions";
import { executeScriptInMainWorld } from "../../../services/chrome/executeScript";

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
    return yotpoWidgetsContainer;
  };

  const getFromMainWorldWindowObject = async () => {
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
    getFromMainWorldWindowObject();
  }, []);

  return (
    <YotpoWidgetContainerContext.Provider
      value={{ data, loading, error, refresh: getFromMainWorldWindowObject }}
    >
      {children}
    </YotpoWidgetContainerContext.Provider>
  );
}
