import React, { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";

export default function DropdownSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidth, setSelectedWidth] = useState("100 %");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const widthOptions = ["50 %", "60 %", "70 %", "80 %", "90 %", "100 %"];

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
    <div className="max-w-md p-6 bg-white rounded-lg font-sans text-[#1a1a1a]">
      {/* Container row for Widget Width */}
      <div
        className="flex items-center justify-between relative"
        ref={dropdownRef}
      >
        <span className="text-lg font-normal tracking-wide">Widget width</span>

        <div className="relative w-36">
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-end w-full py-1 text-lg font-normal text-[#5f6368] hover:text-black focus:outline-none select-none"
          >
            <span className="mr-2">{selectedWidth}</span>
            <ChevronsUpDown className="w-5 h-5 text-[#70757a] stroke-[1.5]" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full z-10 w-full mt-1 bg-white border border-gray-100 shadow-lg rounded-sm max-h-60 overflow-y-auto">
              <div className="py-1">
                {widthOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedWidth(option);
                      setIsOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2 text-lg text-[#1a1a1a] transition-colors duration-150
                      ${selectedWidth === option ? "bg-gray-50 font-medium" : "hover:bg-gray-100 font-normal"}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder rows to match the screenshot spacing */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-lg font-normal tracking-wide">
          Reviews per page
        </span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-lg font-normal tracking-wide">
          Line separator style
        </span>
      </div>
    </div>
  );
}
