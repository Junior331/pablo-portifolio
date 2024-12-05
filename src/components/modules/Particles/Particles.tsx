/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { useMousePosition } from "@/hooks/useMousePosition";
import { animate, hexToRgb, initCanvas, onMouseMove } from "./utils";
import {
  Circle,
  MousePosition,
  ParticlesProps,
  CanvasSizeProps,
} from "./@types";

export const Particles = ({
  vx = 0,
  vy = 0,
  ease = 50,
  size = 0.4,
  quantity = 100,
  staticity = 50,
  className = "",
  refresh = false,
  color = "#ffffff",
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const { x: mousePositionX, y: mousePositionY } = useMousePosition();
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const canvasSize = useRef<CanvasSizeProps>({ width: 0, height: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const rgb = hexToRgb(color);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas({
      dpr,
      rgb,
      size,
      update: true,
      context,
      circles,
      quantity,
      canvasRef,
      canvasSize,
      canvasContainerRef,
    });
    animate({
      vx,
      vy,
      rgb,
      dpr,
      ease,
      mouse,
      size,
      rafID,
      circles,
      context,
      staticity,
      canvasSize,
    });
    window.addEventListener("resize", () =>
      initCanvas({
        dpr,
        rgb,
        size,
        update: true,
        context,
        circles,
        quantity,
        canvasRef,
        canvasSize,
        canvasContainerRef,
      })
    );

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      window.removeEventListener("resize", () =>
        initCanvas({
          dpr,
          rgb,
          size,
          update: true,
          context,
          circles,
          quantity,
          canvasRef,
          canvasSize,
          canvasContainerRef,
        })
      );
    };
  }, [color]);

  useEffect(() => {
    onMouseMove({
      mouse,
      canvasRef,
      canvasSize,
      mousePositionX,
      mousePositionY,
    });
  }, [mousePositionX, mousePositionY]);

  useEffect(() => {
    initCanvas({
      dpr,
      rgb,
      size,
      update: true,
      context,
      circles,
      quantity,
      canvasRef,
      canvasSize,
      canvasContainerRef,
    });
  }, [refresh]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
