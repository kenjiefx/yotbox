import { useRef } from "react";
import ColorPicker from "../../ui/ColorPicker";
import DropdownSelector from "../../ui/DropdownSelector";
import lineSeparatorDashed from "./assets/line-separator-dashed.svg";
import lineSeparatorDotted from "./assets/line-separator-dotted.svg";
import lineSeparatorSmooth from "./assets/line-separator-smooth.svg";
import lineSeparatorThick from "./assets/line-separator-thick.svg";
import lineSeparatorWavy from "./assets/line-separator-wavy.svg";

type GeneralSettingsEditorProps = {
  viewPrimaryColor: string;
  viewStarsColor: string;
  viewTextColor: string;
  viewBackgroundColor: string;
  viewWidgetWidth: string;
  viewLineSeparatorStyle: string;
  contentPaginationPerPage: number;
  onGeneralSettingsChange: (key: string, value: string) => void;
};

export default function GeneralSettingsEditor({
  viewPrimaryColor,
  viewStarsColor,
  viewTextColor,
  viewBackgroundColor,
  viewWidgetWidth,
  viewLineSeparatorStyle,
  contentPaginationPerPage,
  onGeneralSettingsChange,
}: GeneralSettingsEditorProps) {
  if (viewPrimaryColor === "transparent") {
    viewPrimaryColor = "#ffffff";
  }
  if (viewStarsColor === "transparent") {
    viewStarsColor = "#ffffff";
  }
  if (viewTextColor === "transparent") {
    viewTextColor = "#ffffff";
  }
  if (viewBackgroundColor === "transparent") {
    viewBackgroundColor = "#ffffff";
  }
  const lineSeparatorOptions = [
    {
      key: "Smooth",
      label: <img src={lineSeparatorSmooth} className="h-6" alt="Smooth" />,
    },
    {
      key: "Dashed",
      label: <img src={lineSeparatorDashed} className="h-6" alt="Dashed" />,
    },
    {
      key: "Dotted",
      label: <img src={lineSeparatorDotted} className="h-6" alt="Dotted" />,
    },
    {
      key: "Thick",
      label: <img src={lineSeparatorThick} className="h-6" alt="Thick" />,
    },
    {
      key: "Wavy",
      label: <img src={lineSeparatorWavy} className="h-6" alt="Wavy" />,
    },
  ];
  let selectedLineSeparator = lineSeparatorOptions[0];
  let selectedLineSeparatorKey = "Smooth";
  lineSeparatorOptions.forEach((option) => {
    const key = option.key.toLowerCase();
    if (key === viewLineSeparatorStyle.toLowerCase()) {
      selectedLineSeparator = option;
      selectedLineSeparatorKey = option.key;
    }
  });
  return (
    <section className="w-full extension-height">
      <div>
        <div className="font-bold text-sm mb-4">COLORS</div>
        <section className="space-y-3">
          {/* --- 1. PRIMARY COLOR --- */}
          <ColorPicker
            title="Primary color"
            color={viewPrimaryColor}
            onColorChange={(color) =>
              onGeneralSettingsChange("view-primary-color", color)
            }
          />
          {/* --- 2. STARS COLOR --- */}
          <ColorPicker
            title="Stars color"
            color={viewStarsColor}
            onColorChange={(color) =>
              onGeneralSettingsChange("view-stars-color", color)
            }
          />
          {/* --- 3. TEXT COLOR --- */}
          <ColorPicker
            title="Text color"
            color={viewTextColor}
            onColorChange={(color) =>
              onGeneralSettingsChange("view-text-color", color)
            }
          />
          {/* --- 4. BACKGROUND COLOR --- */}
          <ColorPicker
            title="Background color"
            color={viewBackgroundColor}
            onColorChange={(color) =>
              onGeneralSettingsChange("view-background-color", color)
            }
          />
        </section>
      </div>
      <div className="mt-6">
        <div className="font-bold text-sm mb-4">STYLE</div>
        <section className="space-y-3">
          <DropdownSelector
            title="Widget width"
            options={[
              { key: "100", label: "100%" },
              { key: "90", label: "90%" },
              { key: "80", label: "80%" },
              { key: "70", label: "70%" },
              { key: "60", label: "60%" },
              { key: "50", label: "50%" },
            ]}
            selectedKey={viewWidgetWidth}
            selectedLabel={`${viewWidgetWidth} %`}
            onSelect={(key) =>
              onGeneralSettingsChange("view-widget-width", key)
            }
          />

          <DropdownSelector
            title="Reviews per page"
            options={[
              { key: "1", label: "1" },
              { key: "2", label: "2" },
              { key: "3", label: "3" },
              { key: "4", label: "4" },
              { key: "5", label: "5" },
              { key: "6", label: "6" },
              { key: "7", label: "7" },
              { key: "8", label: "8" },
              { key: "9", label: "9" },
              { key: "10", label: "10" },
            ]}
            selectedKey={contentPaginationPerPage.toString()}
            selectedLabel={contentPaginationPerPage.toString()}
            onSelect={(key) =>
              onGeneralSettingsChange("content-pagination-per-page", key)
            }
          />

          <DropdownSelector
            title="Line Separator Style"
            options={lineSeparatorOptions}
            selectedKey={selectedLineSeparatorKey}
            selectedLabel={selectedLineSeparator.label}
            onSelect={(key) =>
              onGeneralSettingsChange("view-line-separator-style", key)
            }
          />
        </section>
      </div>
    </section>
  );
}
