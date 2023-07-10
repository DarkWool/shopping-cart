import { useEffect, useState, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let oldScrollY = window.scrollY;

    const throttle = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => getScrollDirection(), 20);
    };

    function getScrollDirection() {
      const currScrollY = window.scrollY;
      const direction = currScrollY > oldScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        Math.abs(Math.round(oldScrollY - currScrollY)) > 2
      ) {
        setScrollDirection(direction);
      }

      oldScrollY = currScrollY;
    }

    window.addEventListener("scroll", throttle);

    return () => {
      window.removeEventListener("scroll", throttle);
      clearTimeout(timeoutRef.current);
    };
  });

  return scrollDirection;
}
