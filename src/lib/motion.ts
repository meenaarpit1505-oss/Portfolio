export const duration = {
  fast: 0.15,
  base: 0.2,
  roll: 0.25,
  slow: 0.3,
} as const;

export const durationMs = {
  fast: 150,
  base: 200,
  roll: 250,
  slow: 300,
} as const;

/** Shared ease-out curve (transform/opacity only). */
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const tween = {
  fast: { duration: duration.fast, ease: easeOut },
  base: { duration: duration.base, ease: easeOut },
  roll: { duration: duration.roll, ease: easeOut },
  slow: { duration: duration.slow, ease: easeOut },
} as const;

export const magneticSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
  mass: 0.55,
};

export const cursorSpring = {
  type: "spring" as const,
  stiffness: 480,
  damping: 36,
  mass: 0.35,
};

export const magneticOffset = 8;
export const arrowNudge = 4;
export const cardLift = -6;
export const imageZoom = 1.05;
export const logoScale = 1.08;
export const spotlightOpacity = 0.12;

export const rollOut = {
  rest: { y: "0%" },
  hover: { y: "-108%" },
};

export const rollIn = {
  rest: { y: "108%" },
  hover: { y: "0%" },
};

export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
