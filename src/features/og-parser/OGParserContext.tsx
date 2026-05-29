import { createContext } from "react";
import { OpenGraphParserInterface } from "../../types";

export const OGParserContext = createContext<
  OpenGraphParserInterface | undefined
>(undefined);
