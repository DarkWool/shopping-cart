import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let oldScrollY = window.scrollY;
    function getScrollDirection() {
      const currScrollY = window.scrollY;
      const direction = currScrollY > oldScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(oldScrollY - currScrollY) > 4) {
        setScrollDirection(direction);
      }

      oldScrollY = currScrollY;
    }

    window.addEventListener("scroll", getScrollDirection);

    return () => {
      window.removeEventListener("scroll", getScrollDirection);
    };
  });

  return scrollDirection;
}
