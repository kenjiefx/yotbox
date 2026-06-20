import { CircleCheck } from "lucide-react";
import tableStarsLayout from "./assets/table-stars-layout.svg";
import gridStarsLayout from "./assets/grid-stars-layout.svg";

export type LayoutEditorProps = {
  "view-layout": "standardLayout" | "boldLayout";
  onLayoutChange: (layout: "standardLayout" | "boldLayout") => void;
};

export default function LayoutEditor({
  "view-layout": viewLayout,
  onLayoutChange,
}: LayoutEditorProps) {
  const selectedLayoutBorderStyle = "border-1 border-blue-500";
  const setLayoutImageClassName = (layout: "standardLayout" | "boldLayout") =>
    "w-30 h-auto cursor-pointer relative mt-4" +
    (viewLayout === layout ? ` ${selectedLayoutBorderStyle}` : "");
  return (
    <section className="w-full extension-height">
      <div>
        <div className="font-bold text-sm">STANDARD</div>
        <div className="text-xs text-gray-400 mt-2">
          Classic, 3-column layout
        </div>
        <div
          className={setLayoutImageClassName("standardLayout")}
          onClick={() => onLayoutChange("standardLayout")}
        >
          <img
            src={tableStarsLayout}
            alt="Standard Layout"
            className="w-full h-auto"
          />
          {viewLayout === "standardLayout" && (
            <CircleCheck className="absolute -top-3 -right-2 w-5 text-white fill-blue-500" />
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="font-bold text-sm">BOLD</div>
        <div className="text-xs text-gray-400 mt-2">
          Modern, image-centric, grid layout
        </div>
        <div
          className={setLayoutImageClassName("boldLayout")}
          onClick={() => onLayoutChange("boldLayout")}
        >
          <img
            src={gridStarsLayout}
            alt="Bold Layout"
            className="w-full h-auto"
          />
          {viewLayout === "boldLayout" && (
            <CircleCheck className="absolute -top-3 -right-2 w-5 text-white fill-blue-500" />
          )}
        </div>
      </div>
    </section>
  );
}
