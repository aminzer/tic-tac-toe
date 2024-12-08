const getViewportDimensions = (): { width: number; height: number } => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export default getViewportDimensions;
