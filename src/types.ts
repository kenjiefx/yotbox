/**
 * A branded type for Yotpo app keys, ensuring that any value of this type is
 * explicitly marked as an app key, which can help prevent accidental misuse
 * of plain strings where an app key is expected.
 */
export type AppKey = string & { __brand: "yotpo_appkey" };

/**
 * A branded type for widget instance IDs, ensuring that any value of this type is
 * explicitly marked as a widget instance ID, which can help prevent accidental misuse
 * of plain strings where a widget instance ID is expected.
 */
export type WidgetInstanceId = string & { __brand: "yotpo_widget_instance_id" };

/**
 * The shape of a Yotpo widget instance within the YotpoWidgetsContainer
 */
export type YotpoWidgetInstance = {
  instanceId: string;
  className: string;
  customizations: { [key in string]: string | number | boolean };
  staticContent: { [key in string]: string | number | boolean };
};

/**
 * A global object created by the Yotpo JavaScript with additional
 * installation information.
 */
export type YotpoWidgetsContainer = {
  guids: {
    [key: string]: {
      config: {
        data: {
          guid: string;
        };
        widgets: { [key: WidgetInstanceId]: YotpoWidgetInstance };
      };
    };
  };
  initWidgets: (initialize: boolean) => void;
  installationReport: {
    ReviewsStarRatingsWidget: {
      installed: boolean;
    };
    ReviewsMainWidget: {
      installed: boolean;
      productId: string;
    };
  };
};

/**
 * A data about the store instance the current widget is rendered in.
 */
export type YotpoDataContext = {
  appKey: AppKey;
  widgets: Array<WidgetDataContext>;
};

/**
 * The shape of the widget data in the store context.
 */
export type WidgetDataContext = {
  appKey: AppKey;
  widgetId: WidgetInstanceId;
  className: string;
  customizations: { [key in string]: string | number | boolean };
  staticContent: { [key in string]: string | number | boolean };
};

/**
 * An interface for a service that provides yotpoWidgetContainer data.
 * This abstraction allows for different implementations of the
 * data retrieval logic while maintaining a consistent interface
 * for the rest of the application to interact with.
 */
export interface YotpoWidgetContainerServiceInterface {
  data: YotpoWidgetsContainer | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * An interface for a service that provides Open Graph data parsing functionality.
 */
export interface OpenGraphParserInterface {
  openGraphData: {
    type: string | null;
    title: string | null;
    description: string | null;
    siteLogo: string | null;
    siteName: string | null;
  } | null;
  openGraphError: string | null;
}
