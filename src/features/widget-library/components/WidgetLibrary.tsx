import { ArrowRight, Divide, Fingerprint, IdCard, Package } from "lucide-react";
import { useYotpoWidgetContainer } from "../../yotpo-widget-container/hooks/useYotpoWidgetContainer";
import reviewWidgetLight from "./assets/reviews-widget-light.png";
import starRatingsLight from "./assets/star-ratings-light.png";
import promotedProductsLight from "./assets/promoted-products-light.png";
import reviewsCarouselLight from "./assets/reviews-carousel-light.png";
import { useOpenGraphReader } from "../../opengraph-reader/hooks/useOpenGraphReader";
import useWidgetLibrary from "../hooks/useWidgetLibrary";

export default function WidgetLibrary() {
  const { openGraphData } = useOpenGraphReader();
  const { libraryData } = useWidgetLibrary();

  if (openGraphData === null || libraryData === null) return null;

  const reviewsWidgetInstanceId = () => {
    const reviewsWidget = libraryData.find(
      (widget) => widget.className === "ReviewsMainWidget",
    );
    return reviewsWidget ? reviewsWidget.widgetId : null;
  };
  const starRatingsWidgetInstanceId = () => {
    const starRatingsWidget = libraryData.find(
      (widget) => widget.className === "ReviewsStarRatingsWidget",
    );
    return starRatingsWidget ? starRatingsWidget.widgetId : null;
  };
  const promotedProductsWidgetInstanceId = () => {
    const promotedProductsWidget = libraryData.find(
      (widget) => widget.className === "PromotedProductsWidget",
    );
    return promotedProductsWidget ? promotedProductsWidget.widgetId : null;
  };
  const reviewsCarouselWidgetInstanceId = () => {
    const reviewsCarouselWidget = libraryData.find(
      (widget) => widget.className === "ReviewsCarouselWidget",
    );
    return reviewsCarouselWidget ? reviewsCarouselWidget.widgetId : null;
  };
  const getWidgetInstallationStatus = (className: string) => {
    const widget = libraryData.find((widget) => widget.className === className);
    return widget ? widget.installed : false;
  };

  return (
    <section className="flex flex-col space-y-2 py-2">
      {/** Reviews Widget */}
      <div className="px-3">
        <div className="flex items-center space-x-4 px-4 py-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-lg shadow-xs">
          <div className="w-1/2">
            <div
              className="w-full h-28 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${reviewWidgetLight})` }}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <p className="text-[15px] font-semibold">Reviews Widget</p>
            <div className="flex items-center space-x-2">
              <WidgetId getWidgetIdFn={reviewsWidgetInstanceId} />
              <InstallationStatus
                installed={getWidgetInstallationStatus("ReviewsMainWidget")}
              />
            </div>
            <p className="text-[13px] text-gray-500">
              Yotpo's new optimized version! This widget...
            </p>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <span>Edit</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/** Star Ratings Widget */}
      <div className="px-3">
        <div className="flex items-center space-x-4 px-4 py-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-lg shadow-xs">
          <div className="w-1/2">
            <div
              className="w-full h-28 bg-cover bg-center rounded-lg shadow-xs"
              style={{ backgroundImage: `url(${starRatingsLight})` }}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <p className="text-[15px] font-semibold">Star Ratings Widget</p>
            <div className="flex items-center space-x-2">
              <WidgetId getWidgetIdFn={starRatingsWidgetInstanceId} />
              <InstallationStatus
                installed={getWidgetInstallationStatus(
                  "ReviewsStarRatingsWidget",
                )}
              />
            </div>
            <p className="text-[13px] text-gray-500">
              Yotpo's new lightning-fast version with additional...
            </p>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <span>Edit</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/** Promoted Products Widget */}
      <div className="px-3">
        <div className="flex items-center space-x-4 px-4 py-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-lg shadow-xs">
          <div className="w-1/2">
            <div
              className="w-full h-28 bg-cover bg-center rounded-lg shadow-xs"
              style={{ backgroundImage: `url(${promotedProductsLight})` }}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <p className="text-[15px] font-semibold">Promoted Products</p>
            {promotedProductsWidgetInstanceId() !== null && (
              <div className="flex items-center space-x-2">
                <WidgetId getWidgetIdFn={promotedProductsWidgetInstanceId} />
              </div>
            )}
            <p className="text-[13px] text-gray-500">
              Showcase your most popular products above your...
            </p>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <span>Edit</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/** Reviews Carousel Widget */}
      <div className="px-3">
        <div className="flex items-center space-x-4 px-4 py-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-lg shadow-xs">
          <div className="w-1/2">
            <div
              className="relative w-full h-28 bg-cover bg-center rounded-lg shadow-xs"
              style={{ backgroundImage: `url(${reviewsCarouselLight})` }}
            >
              {/* Gradient Overlay Container */}
              <div className="absolute top-0 left-0 w-full p-1 bg-gradient-to-b from-white via-white/80 to-transparent rounded-t-lg"></div>
            </div>
          </div>
          <div className="w-1/2 space-y-1">
            <p className="text-[15px] font-semibold">Reviews Carousel</p>
            {reviewsCarouselWidgetInstanceId() !== null && (
              <div className="flex items-center space-x-2">
                <WidgetId getWidgetIdFn={reviewsCarouselWidgetInstanceId} />
              </div>
            )}
            <p className="text-[13px] text-gray-500">
              Increase review visibility by showcasing your top...
            </p>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <span>Edit</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WidgetId({ getWidgetIdFn }: { getWidgetIdFn: () => string | null }) {
  const widgetId = getWidgetIdFn();
  if (widgetId === null) return null;
  return (
    <div className="flex items-center space-x-1">
      <IdCard className="w-4 h-4 text-gray-400" />
      <code className="text-xs text-gray-500">{widgetId}</code>
    </div>
  );
}

function InstallationStatus({ installed }: { installed: boolean }) {
  if (!installed) return null;
  return (
    <div className="flex items-center space-x-1">
      <span className="bg-emerald-100 text-emerald-600 text-xs font-medium px-1.5 py-0.5 rounded-lg">
        installed
      </span>
    </div>
  );
}
