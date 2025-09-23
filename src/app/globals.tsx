"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const Globals = () => {
  const lastBreakpoint = useRef<string>("");
  const pathname = usePathname();

  // reload the page when the breakpoint changes between desktop and mobile
  // ensures that the animations are always in sync
  useEffect(() => {
    const handleResize = () => {
      const currentBreakpoint =
        window.innerWidth >= 1024 ? "desktop" : "mobile";
      if (
        lastBreakpoint.current.length &&
        currentBreakpoint !== lastBreakpoint.current
      ) {
        window.location.reload();
      }
      lastBreakpoint.current = currentBreakpoint;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
};

export default Globals;
