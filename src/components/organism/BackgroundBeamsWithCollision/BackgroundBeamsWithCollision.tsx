import { useRef } from "react";

import { beams } from "./utils";
import { Props } from "./@types";
import { cn } from "@/lib/utils";
import { CollisionMechanism } from "./CollisionMechanism";

import { Particles, AnimatedGridPattern } from "@/components/modules";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className={cn(
        "flex-col h-screen bg-background relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          beamOptions={beam}
          parentRef={parentRef}
          containerRef={containerRef}
          key={beam.initialX + "beam-idx"}
        />
      ))}

      <div className="relative z-30 w-full h-screen">{children}</div>

      <div className="absolute top-0 z-20 w-full h-screen">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-40%] h-[200%] skew-y-12"
          )}
        />
      </div>

      <div className="absolute top-0 z-10 w-screen h-screen">
        <Particles />
      </div>

      <div
        ref={containerRef}
        className="absolute bottom-0 bg-background w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};
