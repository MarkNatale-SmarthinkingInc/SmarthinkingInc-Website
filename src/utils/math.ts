export const throttle = (func: () => void, delay: number) => {
  let lastTime = 0;
  return () => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func();
      lastTime = now;
    }
  };
};
