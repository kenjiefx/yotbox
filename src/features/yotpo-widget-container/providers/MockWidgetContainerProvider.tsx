import { ReactNode, useState, useEffect } from "react";
import { WidgetInstanceId, YotpoWidgetsContainer } from "../../../types";
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

  const handleCustomize = async (
    guid: string,
    widgetId: WidgetInstanceId,
    key: string,
    value: string | number | boolean,
  ) => {
    if (!data) {
      throw new Error("Yotpo container data is not available");
    }
    if (!data.guids[guid]) {
      throw new Error(`GUID ${guid} not found in Yotpo container`);
    }
    if (!data.guids[guid].config.widgets[widgetId]) {
      throw new Error(
        `Widget ID ${widgetId} not found for GUID ${guid} in Yotpo container`,
      );
    }
    const widget = data.guids[guid].config.widgets[widgetId];
    if (widget.customizations[key] === undefined) {
      throw new Error(
        `Customization key ${key} not found for widget ID ${widgetId} and GUID ${guid}`,
      );
    }
    // Update the customization value in the container data
    const updatedData = {
      ...data,
      guids: {
        ...data.guids,
        [guid]: {
          ...data.guids[guid],
          config: {
            ...data.guids[guid].config,
            widgets: {
              ...data.guids[guid].config.widgets,
              [widgetId]: {
                ...widget,
                customizations: {
                  ...widget.customizations,
                  [key]: value,
                },
              },
            },
          },
        },
      },
    };
    setData(updatedData);
  };

  return (
    <YotpoWidgetContainerContext.Provider
      value={{
        data,
        loading,
        error: null,
        refresh,
        customize: handleCustomize,
      }}
    >
      {children}
    </YotpoWidgetContainerContext.Provider>
  );
}
