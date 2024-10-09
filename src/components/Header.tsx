import React from "react";
import DropdownMenu from "./DropdownMenu";
import settings from "../assets/settings.json";

interface HeaderProps {
  dropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
  onLogoClick: () => void; // New prop for handling logo click
}

const Header: React.FC<HeaderProps> = ({
  dropdownVisible,
  setDropdownVisible,
  onLogoClick, // Destructure the new prop
}) => {
  return (
    <div className="relative flex items-center justify-between p-4 border-b">
      <div
        className="flex items-center logo-glitch hover:cursor-pointer"
        onClick={onLogoClick} // Trigger glitch effect on logo click
      >
        <img src="favicon.png" className="h-16" alt="Favicon" />
        <img className="h-6" src="logo.png" alt="Logo" />
        <span className="hidden ml-2 text-lg font-bold text-gray-800">
          {settings.title}
        </span>
      </div>
      <div className="relative">
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          ⋮
        </button>

        {/* Dropdown Menu */}
        <DropdownMenu
          visible={dropdownVisible}
          setVisible={setDropdownVisible}
        />
      </div>
    </div>
  );
};

export default Header;
