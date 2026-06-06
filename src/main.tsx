import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import YotpoWidgetContainerProvider from "./providers/YotpoWidgetContainerProvider";
import OpenGraphReaderProvider from "./providers/OpenGraphReaderProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OpenGraphReaderProvider>
      <YotpoWidgetContainerProvider>
        <App />
      </YotpoWidgetContainerProvider>
    </OpenGraphReaderProvider>
  </React.StrictMode>,
);
