import { Fingerprint, Globe, Key, Package, Store } from "lucide-react";
import { useEffect, useState } from "react";
import SiteLogo from "../SiteLogo";
import { useYotpoWidgetContainer } from "../../features/yotpo-widget-container/hooks/useYotpoWidgetContainer";
import { YotpoWidgetsContainer } from "../../types";
import { useOpenGraphReader } from "../../features/opengraph-reader/hooks/useOpenGraphReader";
import { findAppKeyGuid } from "../../services/findAppKeyGuid";
import useWidgetLibrary from "../../features/widget-library/hooks/useWidgetLibrary";

function ProductHeader({
  yotpoWidgetsContainer,
  title,
  description,
  siteName,
  siteLogo,
}: {
  yotpoWidgetsContainer: YotpoWidgetsContainer;
  title: string | null;
  description: string | null;
  siteName: string | null;
  siteLogo: string | null;
}) {
  const { libraryData } = useWidgetLibrary();
  let externalId: string | null = null;
  for (const widget of libraryData) {
    if (widget.widgetName === "ReviewsMainWidget") {
      externalId = widget.productId;
      break;
    }
  }
  const appKey = findAppKeyGuid(Object.keys(yotpoWidgetsContainer.guids));
  return (
    <header className="relative overflow-hidden border-b border-indigo-100/80 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="relative px-4 pb-4 pt-3.5">
        <div className="mb-1 gap-2">
          {siteName && (
            <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
              <SiteLogo src={siteLogo} className="h-5 w-5" />
              <span className="truncate font-small">{siteName}</span>
            </div>
          )}
        </div>

        <h1 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-800">
          {title ?? "Untitled product"}
        </h1>

        <section className="mt-1 flex items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Fingerprint className="h-4 w-4" strokeWidth={2} />
            <span>{externalId}</span>
          </div>
          <div className="px-2">|</div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Package className="h-4 w-4" strokeWidth={2} />
            <span></span>
          </div>
        </section>
        <section className="mt-1.5 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Key className="h-4 w-4" strokeWidth={2} />
            <span>{appKey}</span>
          </div>
        </section>
      </div>
    </header>
  );
}

function WebsiteHeader({
  siteName,
  title,
  description,
  siteLogo,
}: {
  siteName: string | null;
  title: string | null;
  description: string | null;
  siteLogo: string | null;
}) {
  const heading = siteName ?? title ?? "Website";
  const subtitle =
    siteName && title && title !== siteName ? title : description;

  return (
    <header className="relative overflow-hidden border-b border-teal-100/80 bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/60">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400" />

      <div className="relative px-4 pb-4 pt-3.5">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-600/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-800">
          <Globe className="h-3.5 w-3.5" strokeWidth={2} />
          Website
        </span>

        <div className="flex items-start gap-3">
          <SiteLogo src={siteLogo} className="h-11 w-11" />

          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className="truncate text-lg font-semibold leading-snug tracking-tight text-slate-800">
              {heading}
            </h1>

            {subtitle && (
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const { openGraphData } = useOpenGraphReader();
  const { data } = useYotpoWidgetContainer();

  if (openGraphData === null || data === null) return null;

  const isProductPage = openGraphData.type === "product";

  if (isProductPage) {
    return (
      <ProductHeader
        yotpoWidgetsContainer={data}
        title={openGraphData.title}
        description={openGraphData.description}
        siteName={openGraphData.siteName}
        siteLogo={null}
      />
    );
  }

  return (
    <WebsiteHeader
      siteName={openGraphData.siteName}
      title={openGraphData.title}
      description={openGraphData.description}
      siteLogo={null}
    />
  );
}
