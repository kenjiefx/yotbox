import { ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type DropdownSelectorProps = {
  title: string;
  options: Array<{
    key: string;
    label: React.ReactNode;
  }>;
  selectedKey: string;
  selectedLabel: React.ReactNode;
  onSelect: (key: string) => void;
};

export default function DropdownSelector({
  title,
  selectedKey,
  selectedLabel,
  options,
  onSelect,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between" ref={dropdownRef}>
      <div className="text-[15px] font-normal">{title}</div>
      <div className="relative w-36">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-end w-full py-1 font-normal text-[#5f6368] hover:text-black focus:outline-none select-none"
        >
          <span className="mr-2">{selectedLabel}</span>
          <ChevronsUpDown className="w-5 h-5 text-[#70757a] stroke-[1.5]" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full z-10 w-full mt-1 bg-white border border-gray-100 shadow-lg rounded-sm max-h-60 overflow-y-auto">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    onSelect(option.key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-right px-4 py-2 text-sm text-md transition-colors duration-150
                            ${selectedKey === option.key ? "bg-gray-50 font-medium" : "hover:bg-gray-100 font-normal"}
                        `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
