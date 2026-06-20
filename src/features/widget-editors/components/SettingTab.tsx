import { useState } from "react";

export type SettingTabProps = {
  renderIcon: () => JSX.Element;
  renderHoverIcon: () => JSX.Element;
  onClick: () => void;
  title: string;
};

export default function SettingTab({
  renderIcon,
  renderHoverIcon,
  onClick,
  title,
}: SettingTabProps) {
  return (
    <div
      className="group flex items-center space-x-2 px-4 py-4 cursor-pointer transition-colors duration-200 hover:bg-[#ccd9fa]"
      onClick={onClick}
    >
      <div className="block group-hover:hidden">{renderIcon()}</div>
      <div className="hidden group-hover:block">{renderHoverIcon()}</div>
      <span className="text-[16px] transition-colors group-hover:text-[#0042e4] ml-2">
        {title}
      </span>
    </div>
  );
}
