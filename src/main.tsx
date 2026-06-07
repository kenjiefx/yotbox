import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import YotpoWidgetContainerProvider from "./providers/YotpoWidgetContainerProvider";
import OpenGraphReaderProvider from "./providers/OpenGraphReaderProvider";
import WidgetLibraryProvider from "./providers/WidgetLibraryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OpenGraphReaderProvider>
      <YotpoWidgetContainerProvider>
        <WidgetLibraryProvider>
          <App />
        </WidgetLibraryProvider>
      </YotpoWidgetContainerProvider>
    </OpenGraphReaderProvider>
  </React.StrictMode>,
);
