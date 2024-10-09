import { useEffect, useState, useRef } from "react";

// Custom hook to check if an element is overflowing its container
export const useIsOverflowing = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const isOverflown = ref.current.scrollWidth > ref.current.clientWidth;
      setIsOverflowing(isOverflown);
    }
  }, []);

  return { ref, isOverflowing };
};
