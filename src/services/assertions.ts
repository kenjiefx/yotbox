import { WidgetInstanceId, YotpoWidgetsContainer } from "../types";

export function assertIsYotpoWidgetsContainer(
  object: unknown,
): asserts object is YotpoWidgetsContainer {
  /**
   * @TODO Implement a robust type guard to ensure the object
   * has the expected structure of YotpoWidgetsContainer
   */
}

export function assertIsYotpoWidgetInstanceId(
  value: unknown,
): asserts value is WidgetInstanceId {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    throw new Error(
      `Expected a string of digits for WidgetInstanceId, but received: ${value}`,
    );
  }
}
