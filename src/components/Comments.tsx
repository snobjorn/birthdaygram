import React, { useEffect, useRef, useState } from "react";
import Notification from "./Notification"; // Import the Notification component
import settings from "../assets/settings.json";

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (spanRef.current) {
        const containerWidth = spanRef.current.parentElement?.offsetWidth ?? 0;
        const textWidth = spanRef.current.scrollWidth;
        setIsOverflowing(textWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  // Handle click on disabled elements to show the notification
  const handleDisabledClick = () => {
    setShowNotification(true);
  };

  return (
    <div className="relative px-4 pb-4">
      {/* Render existing comments */}
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start mb-4 space-x-2">
          <img
            src={`https://robohash.org/${comment.username}?set=set4`}
            alt={`${comment.username}'s profile`}
            className="w-10 h-10 rounded-full shadow-sm"
          />

          <div className="flex flex-col">
            <div className="font-bold text-gray-800">{comment.username}</div>
            <div
              className="text-gray-600 usertext"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            ></div>
          </div>
        </div>
      ))}

      {/* Wrapper to capture clicks on disabled elements */}
      <div className="relative w-full mt-4">
        {/* Form Container */}
        <form className="flex items-center gap-2">
          <div className="relative flex-grow overflow-hidden">
            {/* Static Input Field */}
            <input
              type="text"
              placeholder=""
              className="w-full px-2 py-1 mr-2 text-gray-500 bg-gray-100 border rounded-lg cursor-not-allowed"
              disabled
            />

            {/* Animated Placeholder Text */}
            <span
              ref={spanRef}
              className={`absolute top-0 left-0 h-full px-2 py-1 text-gray-500 pointer-events-none whitespace-nowrap ${
                isOverflowing ? "animate-marquee" : ""
              }`}
            >
              {settings.commentsPlaceholder}
            </span>
          </div>

          <button
            type="button"
            className="px-4 py-1 text-white transition duration-200 ease-in-out bg-blue-700 rounded-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-800"
            disabled
          >
            Submit
          </button>

          {/* Transparent Overlay to Capture Clicks */}
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={handleDisabledClick}
          ></div>
        </form>
      </div>

      {/* Notification Component */}
      <Notification
        message={settings.commentsNotification}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default Comments;
