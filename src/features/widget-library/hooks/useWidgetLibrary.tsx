import { useContext, useState } from "react";
import { WidgetDataContext, YotpoWidgetsContainer } from "../../../types";
import { WidgetLibraryContext } from "../context";

export default function useWidgetLibrary() {
  const context = useContext(WidgetLibraryContext);
  if (!context) {
    throw new Error(
      "useWidgetLibrary must be used within a WidgetLibraryProvider",
    );
  }
  return context;
}
