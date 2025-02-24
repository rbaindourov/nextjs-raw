function throttle<T>(func: (...args: T[]) => void, limit: number) {
  let inThrottle = false;
  return function (this: unknown, ...args: T[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export default throttle;
