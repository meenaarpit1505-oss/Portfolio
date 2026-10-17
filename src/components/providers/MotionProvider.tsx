"use client";

import { FINE_POINTER_QUERY } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MotionCaps = {
  finePointer: boolean;
  reducedMotion: boolean;
  enhance: boolean;
};

const MotionCapsContext = createContext<MotionCaps>({
  finePointer: false,
  reducedMotion: false,
  enhance: false,
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER_QUERY);
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const value = useMemo(
    () => ({
      finePointer,
      reducedMotion,
      enhance: finePointer && !reducedMotion,
    }),
    [finePointer, reducedMotion],
  );

  return <MotionCapsContext.Provider value={value}>{children}</MotionCapsContext.Provider>;
}

export function useMotionCaps() {
  return useContext(MotionCapsContext);
}
