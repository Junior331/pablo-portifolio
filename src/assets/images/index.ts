import fallback from "./placeholder.svg";
import stacksBg from "./stacks_bg.svg";

export const images = {
  fallback,
  stacksBg,
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
