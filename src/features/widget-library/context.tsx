import { createContext } from "react";
import { WidgetLibraryServiceInterface } from "../../types";

export const WidgetLibraryContext = createContext<
  WidgetLibraryServiceInterface | undefined
>(undefined);
