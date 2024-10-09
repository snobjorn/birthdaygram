import React from "react";

interface CarouselButtonProps {
  onClick: () => void;
  direction: "prev" | "next"; // Direction prop to determine arrow style
  className?: string; // Optional additional class names
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  onClick,
  direction,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute p-3 text-xl transform -translate-y-1/2 bg-white rounded-full shadow hover:bg-gray-100 ${className}`}
      style={{ top: "50%" }} // Center the button vertically
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
};

export default CarouselButton;
