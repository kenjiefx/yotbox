import { ExtensionWidgetContainerProvider } from "../features/yotpo-widget-container/providers/ExtensionWidgetContainerProvider";
import { MockWidgetContainerProvider } from "../features/yotpo-widget-container/providers/MockWidgetContainerProvider";

export default function YotpoWidgetContainerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vite strips out the unused branch during production builds (tree-shaking)
  if (import.meta.env.DEV) {
    return (
      <MockWidgetContainerProvider>{children}</MockWidgetContainerProvider>
    );
  }
  return (
    <ExtensionWidgetContainerProvider>
      {children}
    </ExtensionWidgetContainerProvider>
  );
}
