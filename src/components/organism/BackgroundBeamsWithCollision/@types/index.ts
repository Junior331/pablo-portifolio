import { HtmlHTMLAttributes, RefObject } from "react";

import { ReactNode } from "react";

export type Props = {
  className?: string;
  children: ReactNode;
};
export type CollisionMechanismProps = {
  parentRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
} & HtmlHTMLAttributes<HTMLDivElement>;