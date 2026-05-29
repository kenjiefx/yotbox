import { ReactNode, useState, useEffect } from "react";
import { YotpoWidgetsContainer } from "../../types";
import mockData from "./mockYotpoData.json"; // Your static file for dev
import { YotpoWidgetContainerContext } from "./YotpoWidgetContainerContext";

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
      // @ts-ignore - we trust our static mock data to be correct
      setData(mockData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const refresh = async () => {
    setLoading(true);
    // @ts-ignore - we trust our static mock data to be correct
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
