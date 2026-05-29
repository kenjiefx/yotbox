import { ReactNode, useEffect, useState } from "react";
import { OpenGraphParserInterface } from "../../types";
import { OGParserContext } from "./OGParserContext";
import { executeScriptInMainWorld } from "../../services/chrome/executeScript";

export default function MetatagOpenGraphParserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openGraphData, setOpenGraphData] = useState<
    OpenGraphParserInterface["openGraphData"] | null
  >(null);

  const [openGraphError, setOpenGraphError] = useState<string | null>(null);

  function transformResultToOpenGraphData(
    result: unknown,
  ): OpenGraphParserInterface["openGraphData"] {
    if (!(result instanceof Object)) {
      throw new Error("Unexpected result format");
    }
    let type: string | null = null;
    let title: string | null = null;
    let description: string | null = null;
    let siteLogo: string | null = null;
    let siteName: string | null = null;
    if ("type" in result && typeof result.type === "string")
      type = result.type || null;
    if ("title" in result && typeof result.title === "string")
      title = result.title || null;
    if ("description" in result && typeof result.description === "string")
      description = result.description || null;
    if ("siteLogo" in result && typeof result.siteLogo === "string")
      siteLogo = result.siteLogo || null;
    if ("siteName" in result && typeof result.siteName === "string")
      siteName = result.siteName || null;
    return { type, title, description, siteLogo, siteName };
  }

  function queryMetaTagsFromWebpage() {
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
    // get site logo from favicon
    const linkTags = document.getElementsByTagName("link");
    for (let i = 0; i < linkTags.length; i++) {
      const rel = linkTags[i].getAttribute("rel");
      if (rel && rel.includes("icon")) {
        ogData.siteLogo = linkTags[i].getAttribute("href") || "";
        break;
      }
    }
    return ogData;
  }

  async function fetchOpenGraphData() {
    try {
      const result = await executeScriptInMainWorld(queryMetaTagsFromWebpage);
      if (!(result instanceof Object)) {
        throw new Error("Unexpected result format");
      }

      const parsedData = transformResultToOpenGraphData(result);
      setOpenGraphData(parsedData);
    } catch (err: any) {
      setOpenGraphError(err.message || "Failed to fetch Open Graph data");
    }
  }
  useEffect(() => {
    fetchOpenGraphData();
  }, []);
  return (
    <OGParserContext.Provider value={{ openGraphData, openGraphError }}>
      {children}
    </OGParserContext.Provider>
  );
}
