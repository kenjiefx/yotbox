import Header from "./ui/layout/Header";
import WidgetLibrary from "./features/widget-library/components/WidgetLibrary";
import { useState } from "react";
import { AppView } from "./types";
import ReviewsWidgetEditor from "./features/widget-editors/reviews-main-widget/components/ReviewsWidgetEditor";

export default function App() {
  const [view, setView] = useState<AppView>("widget_library");
  return (
    <div id="extension-container" className="bg-gray-200">
      {view === "widget_library" && (
        <>
          <Header />
          <WidgetLibrary viewEditor={(editorView) => setView(editorView)} />
        </>
      )}
      {view === "editor:reviews_main_widget" && (
        <ReviewsWidgetEditor exitEditor={() => setView("widget_library")} />
      )}
    </div>
  );
}
