import React, { useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import ActionButtons from "./components/ActionButtons";
import Comments from "./components/Comments";
import Header from "./components/Header";
import Balloons from "./components/Balloons"; // Import the Balloons component
import Profile from "./components/Profile"; // Import the Profile component
import imagesData from "./assets/images.json";
import commentsData from "./assets/comments.json";
import settings from "./assets/settings.json";

const Birthdaygram: React.FC = () => {
  const [likes, setLikes] = useState(settings.likes);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [glitch, setGlitch] = useState(false); // State to control the glitch effect

  const images = imagesData.images;
  const comments = commentsData.comments;

  const handleLike = () => setLikes(likes + 1);

  // Function to trigger glitch effect
  const triggerGlitch = () => {
    setGlitch(true); // Set glitch state to true to add the class
    setTimeout(() => {
      setGlitch(false); // Remove glitch class after 3 seconds
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-wavy-balloons">
      {/* Render Balloons Across the Entire Site */}
      <Balloons />

      {/* Main Content Container */}
      <div
        className={`relative z-10 flex items-center justify-center min-h-screen ${
          glitch ? "glitch" : ""
        }`} // Toggle glitch class based on the glitch state
      >
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
          {/* Header with triggerGlitch Function as a Prop */}
          <Header
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
            onLogoClick={triggerGlitch} // Pass triggerGlitch function
          />

          {/* Profile Section Component */}
          <Profile
            username={settings.name}
            profilePictureUrl="https://robohash.org/{settings.name}?set=set4"
          />

          {/* Post Image Carousel */}
          <ImageCarousel images={images} onLike={handleLike} />

          {/* Action Buttons */}
          <ActionButtons
            likes={likes}
            onLike={handleLike}
            commentsCount={comments.length}
          />

          {/* Comment Section */}
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Birthdaygram;
