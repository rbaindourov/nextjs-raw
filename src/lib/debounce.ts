function debounce<T>(
  func: (...args: T[]) => void,
  wait: number,
  immediate: boolean = false
) {
  let timeout: NodeJS.Timeout | undefined;
  return function (...args: T[]) {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (!immediate) {
        func(...args);
      }
    }, wait);

    if (callNow) {
      func(...args);
    }
  };
}

export default debounce;
