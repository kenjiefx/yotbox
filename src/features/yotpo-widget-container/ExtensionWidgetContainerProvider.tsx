import { ReactNode, useState, useEffect } from "react";
import { YotpoWidgetsContainer } from "../../types";
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

  const fetchFromWindow = async () => {
    setLoading(true);
    try {
      const fetchedData = await executeScriptInMainWorld(() => {
        if (!("yotpoWidgetsContainer" in window)) {
          throw new Error("window.yotpoWidgetsContainer is not defined");
        }
        return window.yotpoWidgetsContainer;
      });
      assertIsYotpoWidgetsContainer(fetchedData);
      setData(fetchedData || null);
    } catch (err: any) {
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
