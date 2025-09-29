"use client";

import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: Event) {
        const target = e.target as HTMLElement;
        if (
          ref.current &&
          ref.current !== null &&
          !ref.current.contains(target)
        ) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
