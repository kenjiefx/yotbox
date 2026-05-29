import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import YotpoWidgetContainerProvider from "./providers/YotpoWidgetContainerProvider";
import OpenGraphParserProvider from "./providers/OpenGraphParserProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OpenGraphParserProvider>
      <YotpoWidgetContainerProvider>
        <App />
      </YotpoWidgetContainerProvider>
    </OpenGraphParserProvider>
  </React.StrictMode>,
);
