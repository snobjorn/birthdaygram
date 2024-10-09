import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import CarouselButton from "./CarouselButton";

interface ImageCarouselProps {
  images: string[];
  onLike: () => void; // Add prop for handling like count
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onLike }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState<number | null>(null);
  const [animationClass, setAnimationClass] = useState(""); // Track the animation class
  const [showHeart, setShowHeart] = useState(false); // State to control heart animation

  // Preload images after the initial image has loaded
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image, index) => {
        if (index !== currentImageIndex) {
          const img = new Image();
          img.src = image;
        }
      });
    };
    preloadImages();
  }, [currentImageIndex, images]);

  // Calculate the next index based on the current index and length
  const getNextIndex = () => (currentImageIndex + 1) % images.length;

  // Calculate the previous index based on the current index and length
  const getPrevIndex = () =>
    (currentImageIndex - 1 + images.length) % images.length;

  // Handles moving to the next image
  const handleNext = () => {
    const nextIndex = getNextIndex();
    setNextImageIndex(nextIndex);
    setAnimationClass("slide-left");
    setTimeout(() => {
      setCurrentImageIndex(nextIndex); // Update to the next image
      setNextImageIndex(null); // Reset next image index
      setAnimationClass(""); // Reset animation class
    }, 500); // Set timeout based on animation duration
  };

  // Handles moving to the previous image
  const handlePrev = () => {
    const prevIndex = getPrevIndex();
    setNextImageIndex(prevIndex);
    setAnimationClass("slide-right");
    setTimeout(() => {
      setCurrentImageIndex(prevIndex); // Update to the previous image
      setNextImageIndex(null); // Reset next image index
      setAnimationClass(""); // Reset animation class
    }, 500); // Set timeout based on animation duration
  };

  // Handle double click to show heart animation and trigger the like function
  const handleDoubleClick = () => {
    setShowHeart(true);
    onLike(); // Trigger the like update in the parent component

    // Hide the heart animation after 2 seconds
    setTimeout(() => {
      setShowHeart(false);
    }, 2000);
  };

  // Set up swipe handlers for left and right swipes
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(), // Swipe left triggers next image
    onSwipedRight: () => handlePrev(), // Swipe right triggers previous image
    preventScrollOnSwipe: true, // Prevent the page from scrolling on swipe
    trackMouse: true, // Optional: Allow mouse dragging support in desktop mode
  });

  return (
    <div
      {...swipeHandlers} // Apply the swipe handlers to the main container
      className="relative w-full max-w-2xl p-4 mx-auto"
    >
      {/* Container with enforced 1:1 aspect ratio and swipeable area */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ paddingTop: "100%" }}
        onDoubleClick={handleDoubleClick} // Handle double click on the container
      >
        {/* Current Image */}
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 filter-sutro ${
            animationClass === "slide-left" ? "slide-out-left" : ""
          } ${animationClass === "slide-right" ? "slide-out-right" : ""}`}
        />

        {/* Next Image (for animation) */}
        {nextImageIndex !== null && (
          <img
            src={images[nextImageIndex]}
            alt={`Image ${nextImageIndex + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 filter-sutro ${
              animationClass === "slide-left" ? "slide-in-right" : ""
            } ${animationClass === "slide-right" ? "slide-in-left" : ""}`}
          />
        )}

        {/* Heart Animation */}
        {showHeart && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="opacity-0 text-9xl animate-heart-animation">
              ❤️
            </span>
          </div>
        )}
      </div>

      {/* Use the new CarouselButton components for navigation */}
      <CarouselButton
        direction="prev"
        onClick={handlePrev}
        className="left-0" // Additional positioning class
      />
      <CarouselButton
        direction="next"
        onClick={handleNext}
        className="right-0" // Additional positioning class
      />
    </div>
  );
};

export default ImageCarousel;
