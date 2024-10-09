import React, { useRef, useEffect } from "react";
import settings from "../assets/settings.json";

interface DropdownMenuProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, setVisible }) => {
  // Ref for the dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!visible) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
    >
      <div className="p-4 text-sm text-gray-700 credits">
        <div dangerouslySetInnerHTML={{ __html: settings.credits }}></div>
        <p>
          Code by <a href="https://www.asbjornness.no/">Asbjørn Ness Web</a>
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
