import React from "react";
import settings from "../assets/settings.json";

interface ActionButtonsProps {
  likes: number;
  onLike: () => void;
  commentsCount: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  likes,
  onLike,
  commentsCount,
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex space-x-4">
        {/* Like Button */}
        <button onClick={onLike} className="text-red-500 hover:text-red-700">
          ♥ {likes}
        </button>

        {/* Comment Button */}
        <div className="flex items-center text-gray-600 hover:text-gray-700">
          <span>💬</span>
          <span className="ml-1">{commentsCount}</span>
        </div>

        {/* Share Button */}
        <div className="flex items-center text-gray-600 ">
          <span>↗</span>
          <span className="ml-1">{settings.shares}</span>
          {/* Additional Emoticons with Baby and Year */}
        </div>

        {/* Born Button */}
        <div className="flex items-center ml-2 text-gray-600 hover:animate-spin hover:cursor-wait">
          <button>👶</button>
          <span className="ml-1">{settings.birthyear}</span>
        </div>
      </div>

      {/* Tooltip Wrapper for Tag Button */}
      <div className="relative group">
        <button className="text-gray-500 hover:text-gray-700">🔖</button>

        {/* Styled Tooltip on the Left */}
        <div className="absolute left-[-12rem] top-1/2 transform -translate-y-1/2 hidden w-48 p-2 text-sm text-white bg-gray-600 rounded-md group-hover:block">
          {/* Tooltip Content */}
          <span>{settings.tooltip}</span>

          {/* Tooltip Arrow */}
          <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-600 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
