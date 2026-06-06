import { useEffect, useState } from "react";
import { OpenGraphReaderInterface } from "../../../types";
import { OpenGraphReaderContext } from "../context";
import { executeScriptInMainWorld } from "../../../services/chrome/executeScript";

export default function OGMetatagReaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openGraphData, setOpenGraphData] = useState<
    OpenGraphReaderInterface["openGraphData"] | null
  >(null);
  const [openGraphError, setOpenGraphError] = useState<string | null>(null);

  function normalizeOpenGraphData(
    result: unknown,
  ): OpenGraphReaderInterface["openGraphData"] {
    if (!(result instanceof Object)) {
      throw new Error("Unexpected result format");
    }
    let type: string | null = null;
    let title: string | null = null;
    let description: string | null = null;
    let siteName: string | null = null;
    if (
      "type" in result &&
      typeof result.type === "string" &&
      result.type.length > 0
    )
      type = result.type || null;
    if (
      "title" in result &&
      typeof result.title === "string" &&
      result.title.length > 0
    )
      title = result.title || null;
    if (
      "description" in result &&
      typeof result.description === "string" &&
      result.description.length > 0
    )
      description = result.description || null;
    if (
      "siteName" in result &&
      typeof result.siteName === "string" &&
      result.siteName.length > 0
    )
      siteName = result.siteName || null;
    return { type, title, description, siteName };
  }

  function readFromWebpage() {
    const metaTags = document.getElementsByTagName("meta");
    const ogData: { [key: string]: string } = {};
    for (let i = 0; i < metaTags.length; i++) {
      const property = metaTags[i].getAttribute("property");
      if (!property) continue;
      if (property === "og:type")
        ogData.type = metaTags[i].getAttribute("content") || "";
      else if (property === "og:title")
        ogData.title = metaTags[i].getAttribute("content") || "";
      else if (property === "og:description")
        ogData.description = metaTags[i].getAttribute("content") || "";
      else if (property === "og:site_name")
        ogData.siteName = metaTags[i].getAttribute("content") || "";
    }
    return ogData;
  }

  async function readOpenGraphData() {
    try {
      const result = await executeScriptInMainWorld(readFromWebpage);
      if (!(result instanceof Object)) {
        throw new Error("Unexpected result format");
      }

      const parsedData = normalizeOpenGraphData(result);
      setOpenGraphData(parsedData);
    } catch (err: any) {
      setOpenGraphError(err.message || "Failed to fetch Open Graph data");
    }
  }

  useEffect(() => {
    readOpenGraphData();
  }, []);

  return (
    <OpenGraphReaderContext.Provider value={{ openGraphData, openGraphError }}>
      {children}
    </OpenGraphReaderContext.Provider>
  );
}
