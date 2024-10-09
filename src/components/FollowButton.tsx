import React, { useState } from "react";

const FollowButton: React.FC = () => {
  const [showEmoji, setShowEmoji] = useState(false); // Track the emoji display
  const [fadeOut, setFadeOut] = useState(false); // Track the fade-out state

  const handleClick = () => {
    setShowEmoji(true); // Show the emoji when the button is clicked
    setFadeOut(false); // Reset the fade-out effect

    // Start the fade-out effect after 1.5 seconds
    setTimeout(() => {
      setFadeOut(true); // Trigger the fade-out effect
    }, 1500);

    // Completely hide the emoji after 2 seconds
    setTimeout(() => {
      setShowEmoji(false);
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Follow Button */}
      <button
        onClick={handleClick}
        className="px-4 py-1 text-sm font-bold text-blue-600 uppercase border border-blue-600 rounded-md hover:bg-blue-50"
      >
        Stalk
      </button>

      {/* Emoji Element Displayed When State is True */}
      {showEmoji && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Emoji with Fade-out Effect */}
          <span
            className="transition duration-500 ease-in-out text-9xl"
            style={{ opacity: fadeOut ? 0 : 1 }}
          >
            😱
          </span>
        </div>
      )}
    </div>
  );
};

export default FollowButton;
