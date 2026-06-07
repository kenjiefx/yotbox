import Header from "./ui/layout/Header";
import WidgetLibrary from "./features/widget-library/components/WidgetLibrary";

export default function App() {
  return (
    <div id="extension-container" className="bg-gray-200">
      <Header />
      <WidgetLibrary />
    </div>
  );
}
