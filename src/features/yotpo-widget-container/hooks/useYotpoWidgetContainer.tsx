import { useContext } from "react";
import { YotpoWidgetContainerContext } from "../context";

export function useYotpoWidgetContainer() {
  const context = useContext(YotpoWidgetContainerContext);
  if (!context) {
    throw new Error(
      "useYotpoWidgetContainer must be used within a YotpoWidgetContainerProvider",
    );
  }
  return context;
}
