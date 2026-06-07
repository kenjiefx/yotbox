import { ReactNode, useState, useEffect } from "react";
import { YotpoWidgetsContainer } from "../../../types";
import mockData from "./data/yotpoWidgetsContainer.json";
import { YotpoWidgetContainerContext } from "../context";

export function MockWidgetContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<YotpoWidgetsContainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a slight network delay from the static file
    const timer = setTimeout(() => {
      /**
       * @TODO - Probably perform validation against the mock data.
       */
      // @ts-ignore - we trust our static mock data to be correct for now
      setData(mockData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const refresh = async () => {
    setLoading(true);
    /**
     * @TODO - Probably perform validation against the mock data.
     */
    // @ts-ignore - we trust our static mock data to be correct for now
    setData({ ...mockData });
    setLoading(false);
  };

  return (
    <YotpoWidgetContainerContext.Provider
      value={{ data, loading, error: null, refresh }}
    >
      {children}
    </YotpoWidgetContainerContext.Provider>
  );
}
