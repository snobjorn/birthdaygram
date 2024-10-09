import React, { useState } from "react";
import {
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";

const ProfileButtons: React.FC = () => {
  const [spinningButton, setSpinningButton] = useState<string | null>(null);

  // Function to handle button click and trigger spin effect
  const handleSpin = (buttonName: string) => {
    setSpinningButton(buttonName);
    setTimeout(() => {
      setSpinningButton(null); // Remove spin effect after animation completes
    }, 600); // Match the duration of the spin animation
  };

  return (
    <div className="flex items-start h-8 gap-2 mt-6 text-center">
      {/* Profile Page Link with User Icon */}
      <a
        href="#"
        className={`flex items-center justify-center w-full h-full gap-2 py-2 text-sm text-blue-600 uppercase border border-blue-600 rounded hover:bg-blue-50 ${
          spinningButton === "profil" ? "spin-horizontal" : ""
        }`}
        onClick={() => handleSpin("profil")} // Add click handler to trigger spin
      >
        <UserIcon className="w-5 h-5" /> Profile
      </a>

      {/* Follow Link with Plus Icon */}
      <a
        href="#"
        className={`flex items-center justify-center w-full h-full gap-2 py-2 text-sm text-blue-600 uppercase border border-blue-600 rounded hover:bg-blue-50 ${
          spinningButton === "follow" ? "spin-horizontal" : ""
        }`}
        onClick={() => handleSpin("follow")} // Add click handler to trigger spin
      >
        <PlusIcon className="w-5 h-5" /> Follow
      </a>

      {/* Share Link with Paper Airplane Icon */}
      <a
        href="#"
        className={`flex items-center justify-center w-full h-full gap-2 py-2 text-sm text-blue-600 uppercase border border-blue-600 rounded hover:bg-blue-50 ${
          spinningButton === "share" ? "spin-horizontal" : ""
        }`}
        onClick={() => handleSpin("share")} // Add click handler to trigger spin
      >
        <PaperAirplaneIcon className="w-5 h-5" /> Share
      </a>
    </div>
  );
};

export default ProfileButtons;
