import { createContext } from "react";
import { OpenGraphReaderInterface } from "../../types";

export const OpenGraphReaderContext = createContext<
  OpenGraphReaderInterface | undefined
>(undefined);
