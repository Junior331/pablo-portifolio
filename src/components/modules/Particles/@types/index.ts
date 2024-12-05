import { MutableRefObject, RefObject } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export interface CanvasSizeProps {
  width: number;
  height: number;
}

export interface ParticlesProps {
  vx?: number;
  vy?: number;
  ease?: number;
  size?: number;
  color?: string;
  quantity?: number;
  refresh?: boolean;
  className?: string;
  staticity?: number;
}

export interface Circle extends MousePosition {
  dx: number;
  dy: number;
  size: number;
  alpha: number;
  magnetism: number;
  translateX: number;
  translateY: number;
  targetAlpha: number;
}

export type onMouseMoveProps = {
  mouse: MutableRefObject<MousePosition>;
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasSize: MutableRefObject<CanvasSizeProps>;
  mousePositionX: number;
  mousePositionY: number;
};

export type resizeCanvasPros = {
  dpr: number;
  circles: MutableRefObject<Circle[]>;
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasSize: MutableRefObject<CanvasSizeProps>;
  canvasContainerRef: RefObject<HTMLDivElement>;
  context: MutableRefObject<CanvasRenderingContext2D | null>;
};

export type initCanvasPros = resizeCanvasPros & {
  rgb: number[];
  size: number;
  update: boolean;
  quantity: number;
};

export type circleParamsProps = {
  size: number;
  canvasSize: MutableRefObject<CanvasSizeProps>;
};

export type drawCircleProps = {
  rgb: number[];
  dpr: number;
  update: boolean;
  circle: Circle;
  circles: MutableRefObject<Circle[]>;
  context: MutableRefObject<CanvasRenderingContext2D | null>;
};

export type clearContextProps = {
  canvasSize: MutableRefObject<CanvasSizeProps>;
  context: MutableRefObject<CanvasRenderingContext2D | null>;
};

export type drawParticlesProps = clearContextProps &
  drawCircleProps & {
    size: number;
    quantity: number;
    rgb: number[];
    dpr: number;
    update: boolean;
    circles: MutableRefObject<Circle[]>;
  };

export type remapValueProps = {
  end1: number;
  end2: number;
  value: number;
  start1: number;
  start2: number;
};


export type animateProps = {
  vx: number;
  vy: number;
  rgb: number[];
  dpr: number;
  ease: number;
  mouse: MutableRefObject<MousePosition>;
  size: number;
  rafID: MutableRefObject<number | null>;
  circles: MutableRefObject<Circle[]>;
  context: MutableRefObject<CanvasRenderingContext2D | null>;
  staticity: number;
  canvasSize: MutableRefObject<CanvasSizeProps>;
};
