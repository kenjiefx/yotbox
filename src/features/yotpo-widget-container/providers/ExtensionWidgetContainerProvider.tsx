import { ReactNode, useState, useEffect } from "react";
import {
  AppKey,
  WidgetInstanceId,
  YotpoWidgetsContainer,
} from "../../../types";
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

  const updateWidgetContainer = (
    guid: string,
    widgetId: WidgetInstanceId,
    key: string,
    value: string | number | boolean,
  ) => {
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
    if (!("guids" in yotpoWidgetsContainer)) {
      throw new Error("yotpoWidgetsContainer does not contain guids");
    }
    if (
      typeof yotpoWidgetsContainer.guids !== "object" ||
      yotpoWidgetsContainer.guids === null
    ) {
      throw new Error("yotpoWidgetsContainer.guids is not an object");
    }
    if (!(guid in yotpoWidgetsContainer.guids)) {
      throw new Error(`GUID ${guid} not found in yotpoWidgetsContainer`);
    }
    // @ts-expect-error - We need to assert the type of the guid data to access the config and widgets properties
    const guidData = yotpoWidgetsContainer.guids[
      guid
    ] as YotpoWidgetsContainer["guids"][string];
    const widgetData = guidData.config.widgets[widgetId];
    if (!widgetData) {
      throw new Error(`Widget ID ${widgetId} not found for GUID ${guid}`);
    }
    if (!(key in widgetData.customizations)) {
      throw new Error(
        `Customization key ${key} not found for widget ID ${widgetId} and GUID ${guid}`,
      );
    }
    // Update the customization value in the Yotpo container object in the main world
    widgetData.customizations[key] = value;
    // @ts-expect-error
    yotpoWidgetsContainer.initWidgets();
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
    executeScriptInMainWorld(
      updateWidgetContainer,
      guid,
      widgetId,
      key,
      value,
    ).catch((err) => {
      console.error(
        "Failed to update widget customization in main world:",
        err,
      );
    });
    setData(updatedData);
  };

  return (
    <YotpoWidgetContainerContext.Provider
      value={{
        data,
        loading,
        error,
        refresh: getFromMainWorldWindowObject,
        customize: handleCustomize,
      }}
    >
      {children}
    </YotpoWidgetContainerContext.Provider>
  );
}
