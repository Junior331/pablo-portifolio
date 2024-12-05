import {
  Circle,
  animateProps,
  initCanvasPros,
  drawCircleProps,
  remapValueProps,
  onMouseMoveProps,
  resizeCanvasPros,
  clearContextProps,
  circleParamsProps,
  drawParticlesProps,
} from "./@types";

export const onMouseMove = ({
  mouse,
  canvasRef,
  canvasSize,
  mousePositionX,
  mousePositionY,
}: onMouseMoveProps) => {
  if (canvasRef.current) {
    const rect = canvasRef.current.getBoundingClientRect();
    const { width, height } = canvasSize.current;
    const x = mousePositionX - rect.left - width / 2;
    const y = mousePositionY - rect.top - height / 2;
    const inside =
      x < width / 2 && x > -width / 2 && y < height / 2 && y > -height / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  }
};

const resizeCanvas = ({
  dpr,
  context,
  circles,
  canvasRef,
  canvasSize,
  canvasContainerRef,
}: resizeCanvasPros) => {
  if (canvasContainerRef.current && canvasRef.current && context.current) {
    circles.current.length = 0;
    canvasSize.current.width = canvasContainerRef.current.offsetWidth;
    canvasSize.current.height = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.width * dpr;
    canvasRef.current.height = canvasSize.current.height * dpr;
    canvasRef.current.style.width = `${canvasSize.current.width}px`;
    canvasRef.current.style.height = `${canvasSize.current.height}px`;
    context.current.scale(dpr, dpr);
  }
};

const circleParams = ({ canvasSize, size }: circleParamsProps): Circle => {
  const x = Math.floor(Math.random() * canvasSize.current.width);
  const y = Math.floor(Math.random() * canvasSize.current.height);
  const translateX = 0;
  const translateY = 0;
  const pSize = Math.floor(Math.random() * 2) + size;
  const alpha = 0;
  const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
  const dx = (Math.random() - 0.5) * 0.1;
  const dy = (Math.random() - 0.5) * 0.1;
  const magnetism = 0.1 + Math.random() * 4;
  return {
    x,
    y,
    translateX,
    translateY,
    size: pSize,
    alpha,
    targetAlpha,
    dx,
    dy,
    magnetism,
  };
};

const drawCircle = ({
  rgb,
  dpr,
  update,
  circle,
  circles,
  context,
}: drawCircleProps) => {
  if (context.current) {
    const { x, y, translateX, translateY, size, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, size, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!update) {
      circles.current.push(circle);
    }
  }
};

const clearContext = ({ context, canvasSize }: clearContextProps) => {
  if (context.current) {
    context.current.clearRect(
      0,
      0,
      canvasSize.current.width,
      canvasSize.current.height
    );
  }
};

const drawParticles = ({
  rgb,
  dpr,
  size,
  update,
  circles,
  context,
  quantity,
  canvasSize,
}: drawParticlesProps) => {
  clearContext({ context, canvasSize });
  const particleCount = quantity;
  for (let i = 0; i < particleCount; i++) {
    const circle = circleParams({ canvasSize, size });
    drawCircle({ rgb, dpr, update, circle, circles, context });
  }
};

const remapValue = ({
  end1,
  end2,
  value,
  start1,
  start2,
}: remapValueProps): number => {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
};

export const animate = ({
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
}: animateProps) => {
  clearContext({ context, canvasSize });
  circles.current.forEach((circle: Circle, i: number) => {
    // Handle the alpha value
    const edge = [
      circle.x + circle.translateX - circle.size, // distance from left edge
      canvasSize.current.width - circle.x - circle.translateX - circle.size, // distance from right edge
      circle.y + circle.translateY - circle.size, // distance from top edge
      canvasSize.current.height - circle.y - circle.translateY - circle.size, // distance from bottom edge
    ];
    const closestEdge = edge.reduce((a, b) => Math.min(a, b));
    const remapClosestEdge = parseFloat(
      remapValue({
        value: closestEdge,
        start1: 0,
        end1: 20,
        start2: 0,
        end2: 1,
      }).toFixed(2)
    );
    if (remapClosestEdge > 1) {
      circle.alpha += 0.02;
      if (circle.alpha > circle.targetAlpha) {
        circle.alpha = circle.targetAlpha;
      }
    } else {
      circle.alpha = circle.targetAlpha * remapClosestEdge;
    }
    circle.x += circle.dx + vx;
    circle.y += circle.dy + vy;
    circle.translateX +=
      (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
      ease;
    circle.translateY +=
      (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
      ease;

    drawCircle({ rgb, dpr, update: true, circle, circles, context });

    // circle gets out of the canvas
    if (
      circle.x < -circle.size ||
      circle.x > canvasSize.current.width + circle.size ||
      circle.y < -circle.size ||
      circle.y > canvasSize.current.height + circle.size
    ) {
      // remove the circle from the array
      circles.current.splice(i, 1);
      // create a new circle
      const newCircle = circleParams({ canvasSize, size });
      drawCircle({
        rgb,
        dpr,
        update: true,
        circle: newCircle,
        circles,
        context,
      });
      // update the circle position
    }
  });
  rafID.current = window.requestAnimationFrame(() =>
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
    })
  );
};

export const hexToRgb = (hex: string): number[] => {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
};

export const initCanvas = ({
  dpr,
  rgb,
  size,
  update,
  context,
  circles,
  quantity,
  canvasRef,
  canvasSize,
  canvasContainerRef,
}: initCanvasPros) => {
  resizeCanvas({
    dpr,
    context,
    circles,
    canvasRef,
    canvasSize,
    canvasContainerRef,
  });
  if (context.current) {
    drawParticles({ rgb, dpr, size, update, circle: circles.current[0], context, quantity, canvasSize, circles });
  }
};
