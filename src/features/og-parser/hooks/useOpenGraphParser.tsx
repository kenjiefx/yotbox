import { useContext } from "react";
import { OGParserContext } from "../OGParserContext";

export function useOpenGraphParser() {
  const context = useContext(OGParserContext);
  if (!context) {
    throw new Error(
      "useOpenGraphParser must be used within a OpenGraphParserProvider",
    );
  }
  return context;
}
