
const QUERY = "(prefers-reduced-motion: reduce)";

let motion = false
if (window.matchMedia) {
  motion = window.matchMedia(QUERY).matches;
}

export const reduceMotion = motion
