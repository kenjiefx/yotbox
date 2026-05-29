import { ReactNode, useState } from "react";
import { OpenGraphParserInterface } from "../../types";
import { OGParserContext } from "./OGParserContext";

export default function MockOpenGraphParserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<OpenGraphParserInterface["openGraphData"]>({
    type: "product",
    title: "A Green Bag",
    description: "A stylish green bag for everyday use.",
    siteLogo: "https://example.com/logo.png",
    siteName: "Stylish Bags Store",
  });
  return (
    <OGParserContext.Provider
      value={{ openGraphData: data, openGraphError: null }}
    >
      {children}
    </OGParserContext.Provider>
  );
}
