import { useRef } from "react";

export type ColorPickerProps = {
  title: string;
  color: string;
  onColorChange: (color: string) => void;
};

export default function ColorPicker({
  title,
  color,
  onColorChange,
}: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  if (color === "transparent") {
    color = "#ffffff";
  }
  return (
    <div className="flex items-center justify-between">
      <div className="text-[15px] font-normal">{title}</div>
      <div className="relative w-7 h-7">
        <input
          type="color"
          ref={inputRef}
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        <button
          onClick={() => inputRef.current?.click()}
          style={{ backgroundColor: color }}
          className="w-full h-full rounded-full border border-black/10 shadow-inner hover:opacity-90 transition-opacity"
          aria-label={`Change ${title.toLowerCase()}`}
        />
      </div>
    </div>
  );
}
