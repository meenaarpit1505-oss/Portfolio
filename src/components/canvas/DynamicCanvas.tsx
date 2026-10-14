"use client";

import dynamic from "next/dynamic";

export const DynamicCanvas = dynamic(
  () => import("@/components/canvas/CanvasContainer"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default DynamicCanvas;
