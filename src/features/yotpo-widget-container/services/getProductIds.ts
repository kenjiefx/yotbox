import { YotpoWidgetsContainer } from "../../../types";
import { findAppKeyGuid } from "../../../services/contextFactory";

function getProductIdsFromInstallationReport(
  yotpoWidgetsContainer: YotpoWidgetsContainer,
): {
  externalId: string | null;
  yotpoProductId: string | null;
} {
  const installationReport = yotpoWidgetsContainer.installationReport;
  if (!installationReport) {
    return {
      externalId: null,
      yotpoProductId: null,
    };
  }
  const reviewsMainWidgetReport = installationReport.ReviewsMainWidget;
  if (!reviewsMainWidgetReport || !reviewsMainWidgetReport.installed) {
    return {
      externalId: null,
      yotpoProductId: null,
    };
  }
  const externalId = reviewsMainWidgetReport.productId || null;
  return {
    externalId,
    yotpoProductId: null,
  };
}

export function getProductIdsFromYotpoWidgetContainer(
  yotpoWidgetsContainer: YotpoWidgetsContainer,
): {
  externalId: string | null;
  yotpoProductId: string | null;
} {
  const guidKeys = Object.keys(yotpoWidgetsContainer.guids);
  const appKey = findAppKeyGuid(guidKeys);
  const appGuidInstance = yotpoWidgetsContainer.guids[appKey];
  if (!("product_filters_data" in appGuidInstance)) {
    return getProductIdsFromInstallationReport(yotpoWidgetsContainer);
  }
  if (
    typeof appGuidInstance.product_filters_data !== "object" ||
    appGuidInstance.product_filters_data === null
  ) {
    return getProductIdsFromInstallationReport(yotpoWidgetsContainer);
  }
  let yotpoProductId: string | null = null;
  let externalId: string | null = null;
  if ("externalId" in appGuidInstance.product_filters_data) {
    if (typeof appGuidInstance.product_filters_data.externalId === "string") {
      externalId = appGuidInstance.product_filters_data.externalId;
    }
  }
  if ("productId" in appGuidInstance.product_filters_data) {
    if (typeof appGuidInstance.product_filters_data.productId === "string") {
      yotpoProductId = appGuidInstance.product_filters_data.productId;
    }
  }
  // If externalId is null, try to get it from installation report
  if (!externalId) {
    const installationReportData = getProductIdsFromInstallationReport(
      yotpoWidgetsContainer,
    );
    externalId = installationReportData.externalId;
  }
  return {
    externalId,
    yotpoProductId,
  };
}
