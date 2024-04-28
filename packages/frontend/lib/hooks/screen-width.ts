import React from "react";

export interface UseScreenWidthReturn {
  isSmall: boolean;
}

/**
 * A hook which checks whether the current screen size is small (below 640px)
 *
 * @returns Whether the current screen is small
 */
export function useScreenWidth(): UseScreenWidthReturn {
  // The value for tailwind's SM breakpoint
  const smallPx = 640;
  const [isSmall, setIsSmall] = React.useState(false);

  React.useEffect(() => {
    // For the on page load
    const checkIfSmall = () => window.innerWidth < smallPx;
    setIsSmall(checkIfSmall());

    // Called every resize
    const handleResize = () => setIsSmall(checkIfSmall());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isSmall };
}
