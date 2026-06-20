import { useState } from "react";
import EditorHeader from "../../layout/EditorHeader";
import SettingTab from "../../components/SettingTab";
import layoutIconHover from "./assets/layout-icon-hover.svg";
import layoutIcon from "./assets/layout-icon.svg";
import generalSettingsIcon from "./assets/general-settings-icon.svg";
import generalSettingsIconHover from "./assets/general-settings-icon-hover.svg";
import starsIcon from "./assets/stars-icon.svg";
import starsIconHover from "./assets/stars-icon-hover.svg";
import campaignSettingsIcon from "./assets/campaign-settings-icon.svg";
import campaignSettingsIconHover from "./assets/campaign-settings-icon-hover.svg";
import sortingAndFilteringIcon from "./assets/sorting-and-filtering-icon.svg";
import sortingAndFilteringIconHover from "./assets/sorting-and-filtering-icon-hover.svg";
import infoIcon from "./assets/info-icon.svg";
import infoIconHover from "./assets/info-icon-hover.svg";
import listItems from "./assets/list-items.svg";
import listItemsHover from "./assets/list-items-hover.svg";
import emptyStateIcon from "./assets/empty-state-icon.svg";
import emptyStateIconHover from "./assets/empty-state-icon-hover.svg";
import { useYotpoWidgetContainer } from "../../../yotpo-widget-container/hooks/useYotpoWidgetContainer";
import { findAppKeyGuid } from "../../../../services/findAppKeyGuid";
import LayoutEditor from "./LayoutEditor";
import { WidgetInstanceId } from "../../../../types";
import GeneralSettingsEditor from "./GeneralSettingsEditor";

type ReviewsWidgetEditorProps = {
  exitEditor: () => void;
};

export default function ReviewsWidgetEditor({
  exitEditor,
}: ReviewsWidgetEditorProps) {
  const { data, customize } = useYotpoWidgetContainer();

  const [view, setView] = useState<
    | "home"
    | "layout:settings"
    | "general:settings"
    | "reviews-summary:settings"
    | "widget-header:settings"
    | "sorting-and-filtering:settings"
    | "custom-questions:settings"
    | "reviews:settings"
    | "empty-state:settings"
  >("home");
  const viewsMap = {
    "layout:settings": {
      title: "Layout",
      icon: layoutIcon,
      hoverIcon: layoutIconHover,
    },
    "general:settings": {
      title: "General Settings",
      icon: generalSettingsIcon,
      hoverIcon: generalSettingsIconHover,
    },
    "reviews-summary:settings": {
      title: "Reviews Summary",
      icon: starsIcon,
      hoverIcon: starsIconHover,
    },
    "widget-header:settings": {
      title: "Widget Header",
      icon: campaignSettingsIcon,
      hoverIcon: campaignSettingsIconHover,
    },
    "sorting-and-filtering:settings": {
      title: "Sorting and Filtering",
      icon: sortingAndFilteringIcon,
      hoverIcon: sortingAndFilteringIconHover,
    },
    "custom-questions:settings": {
      title: "Custom Questions",
      icon: infoIcon,
      hoverIcon: infoIconHover,
    },
    "reviews:settings": {
      title: "Reviews",
      icon: listItems,
      hoverIcon: listItemsHover,
    },
    "empty-state:settings": {
      title: "Empty State",
      icon: emptyStateIcon,
      hoverIcon: emptyStateIconHover,
    },
  };
  if (data === null) {
    return <div>Loading...</div>;
  }
  const guids = Object.keys(data.guids);
  const appKeyGuid = findAppKeyGuid(guids);
  const widgetData = data.guids[appKeyGuid].config.widgets;
  const reviewWidgetData = Object.values(widgetData).find(
    (widget) => widget.className === "ReviewsMainWidget",
  );
  if (!reviewWidgetData) {
    return <div>No Reviews Widget found</div>;
  }
  const widgetId = reviewWidgetData.instanceId as WidgetInstanceId;
  const customizations = reviewWidgetData.customizations;
  const onCustomize = async (key: string, value: string | number | boolean) => {
    await customize(appKeyGuid, widgetId, key, value);
  };
  return (
    <div className="">
      {view === "home" ? (
        <EditorHeader title="Reviews Widget" onExit={exitEditor} />
      ) : (
        <EditorHeader
          title={viewsMap[view].title}
          onExit={() => setView("home")}
        />
      )}

      {view === "home" && (
        <section className="w-full card px-2 py-2">
          {/* Loop through viewsMap to render SettingTabs */}
          {Object.entries(viewsMap).map(([key, { title, icon, hoverIcon }]) => (
            <SettingTab
              key={key}
              renderIcon={() => <img src={icon} alt={`${title} Icon`} />}
              renderHoverIcon={() => (
                <img src={hoverIcon} alt={`${title} Icon Hover`} />
              )}
              title={title}
              onClick={() => setView(key as any)}
            />
          ))}
        </section>
      )}

      {view === "layout:settings" && (
        <section className="w-full h-full card px-6 py-6">
          <LayoutEditor
            view-layout={
              customizations["view-layout"] as "standardLayout" | "boldLayout"
            }
            onLayoutChange={(layout) => onCustomize("view-layout", layout)}
          />
        </section>
      )}

      {view === "general:settings" && (
        <section className="w-full h-full card px-6 py-6">
          {
            <GeneralSettingsEditor
              viewPrimaryColor={customizations["view-primary-color"] as string}
              viewStarsColor={customizations["view-stars-color"] as string}
              viewTextColor={customizations["view-text-color"] as string}
              viewBackgroundColor={
                customizations["view-background-color"] as string
              }
              viewWidgetWidth={customizations["view-widget-width"] as string}
              viewLineSeparatorStyle={
                customizations["view-line-separator-style"] as string
              }
              contentPaginationPerPage={
                customizations["content-pagination-per-page"] as number
              }
              onGeneralSettingsChange={onCustomize}
            />
          }
        </section>
      )}
    </div>
  );
}
