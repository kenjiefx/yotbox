import { createContext } from "react";
import { YotpoWidgetContainerServiceInterface } from "../../types";

export const YotpoWidgetContainerContext = createContext<
  YotpoWidgetContainerServiceInterface | undefined
>(undefined);
