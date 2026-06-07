import LiveWidgetLibraryProvider from "../features/widget-library/providers/LiveWidgetLibraryProvider";
import MockWidgetLibraryProvider from "../features/widget-library/providers/MockWidgetLibraryProvider";

export default function WidgetLibraryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (import.meta.env.DEV) {
    return <MockWidgetLibraryProvider>{children}</MockWidgetLibraryProvider>;
  }
  return <LiveWidgetLibraryProvider>{children}</LiveWidgetLibraryProvider>;
}
