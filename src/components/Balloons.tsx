import React from "react";

const Balloons: React.FC = () => {
  const numberOfBalloons = 10; // Set the number of balloons to generate

  // Generate an array of balloon elements
  const balloons = Array.from({ length: numberOfBalloons }).map((_, index) => (
    <div
      key={index}
      className="balloon"
      style={{
        left: `${Math.random() * 100}vw`, // Random horizontal position
        animationDuration: `${Math.random() * 6 + 6}s`, // Random animation duration
        animationDelay: `${Math.random() * 5}s`, // Random delay for staggered appearance
      }}
    >
      🎈
    </div>
  ));

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full pointer-events-none balloon-wrapper">
      {balloons}
    </div>
  );
};

export default Balloons;
