"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Keep in sync with --modal-transition-duration in globals.css.
export const MODAL_CLOSE_MS = 200;

// Delays unmounting until the CSS fade-out finishes; skips the delay
// when the animations toggle is off.
export function useModalTransition(onClose: () => void) {
  const [closing, setClosing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    const disabled = document.documentElement.classList.contains("no-animations");
    setClosing(true);
    timeoutRef.current = setTimeout(onClose, disabled ? 0 : MODAL_CLOSE_MS);
  }, [onClose]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { closing, close };
}