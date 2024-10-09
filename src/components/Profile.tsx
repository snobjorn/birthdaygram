import React, { useState, useRef, useEffect } from "react";
import FollowButton from "./FollowButton";
import ProfileButtons from "./ProfileButtons";
import settings from "../assets/settings.json";

interface ProfileProps {
  username: string;
  profilePictureUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, profilePictureUrl }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Toggle the modal visibility and animate it
  const handleProfileClick = () => {
    setModalVisible(true);
    setTimeout(() => {
      setAnimateModal(true); // Trigger animation state for opening
    }, 10); // Small delay to trigger the CSS transition
  };

  // Handle closing the modal with animation
  const handleClose = () => {
    setAnimateModal(false); // Trigger closing animation
    setTimeout(() => {
      setModalVisible(false); // Remove modal from the DOM after animation completes
    }, 300); // Match the duration of the closing animation (300ms)
  };

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose(); // Close modal when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="relative flex items-center justify-between px-4 pt-4">
      {/* Profile Picture and Username */}
      <div
        className="flex items-center cursor-pointer"
        onClick={handleProfileClick}
      >
        <img
          src={profilePictureUrl}
          alt={`${username}'s profile`}
          className="w-12 h-12 rounded-full"
        />
        <span className="ml-4 text-lg font-bold text-gray-800">{username}</span>
      </div>

      {/* Follow Button */}
      <FollowButton />

      {/* Modal and Overlay */}
      {modalVisible && (
        <>
          {/* Darkened Overlay with Click Handler */}
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
              animateModal ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose} // Close modal when clicking the overlay
          >
            {/* Modal Window with Scale and Opacity Animation */}
            <div
              ref={modalRef}
              className={`relative z-50 p-6 bg-white rounded-lg shadow-lg w-96 transition-all duration-300 transform ${
                animateModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()} // Prevent modal click from closing the modal
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
              >
                &times;
              </button>

              {/* Centered Profile Image and Username */}
              <div className="flex flex-col items-center">
                <img
                  src={profilePictureUrl}
                  alt={`${username}'s profile`}
                  className="w-32 h-32 mb-4 rounded-full"
                />
                <span className="text-xl font-bold text-gray-800">
                  {username}
                </span>
                <p className="mt-2">{settings.profileText}</p>
              </div>

              {/* Profile Buttons (Follow and Share) */}
              <ProfileButtons />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
