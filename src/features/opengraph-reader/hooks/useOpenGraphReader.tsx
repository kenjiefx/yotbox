import { useContext } from "react";
import { OpenGraphReaderContext } from "../context";

export function useOpenGraphReader() {
  const context = useContext(OpenGraphReaderContext);
  if (!context) {
    throw new Error(
      "useOpenGraphReader must be used within a OpenGraphReaderProvider",
    );
  }
  return context;
}
