import { ReactNode, useState } from "react";
import { OpenGraphReaderInterface } from "../../../types";
import { OpenGraphReaderContext } from "../context";

export default function MockOpenGraphReaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<OpenGraphReaderInterface["openGraphData"]>({
    type: "product",
    title: "A Green Bag",
    description: "A stylish green bag for everyday use.",
    siteName: "Stylish Bags Store",
  });
  return (
    <OpenGraphReaderContext.Provider
      value={{ openGraphData: data, openGraphError: null }}
    >
      {children}
    </OpenGraphReaderContext.Provider>
  );
}
