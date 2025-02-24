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

function throttleWLastCall<T>(func: (...args: T[]) => void, limit: number) {
  let inThrottle: boolean; // Tracks if we're in a throttle period
  let lastCallTimeout: ReturnType<typeof setTimeout> | null; // Stores timeout for the trailing call

  return function (this: unknown, ...args: T[]) {
    if (!inThrottle) {
      // Execute immediately on the first call
      func.apply(this, args);
      inThrottle = true;

      // Reset throttle after the limit and handle trailing call
      setTimeout(() => {
        inThrottle = false;
        if (lastCallTimeout) {
          clearTimeout(lastCallTimeout);
          lastCallTimeout = null;
          func.apply(this, args); // Execute the last call
        }
      }, limit);
    } else {
      // During throttle period, queue the last call
      clearTimeout(lastCallTimeout as ReturnType<typeof setTimeout>);
      lastCallTimeout = setTimeout(() => {
        if (!inThrottle) {
          func.apply(this, args); // Execute if throttle has ended
        }
      }, limit);
    }
  };
}

function throttleCallLast<T>(func: (...args: T[]) => void, limit: number) {
  let inThrottle = false;
  let lastArgs: T[] | null = null;

  return function (this: unknown, ...args: T[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

// const express = require('express');
// const app = express();
// const port = 3000;

// const RATE_LIMIT = 5;         // Max 5 requests
// const TIME_WINDOW = 60000;    // 1-minute window
// const CLEANUP_INTERVAL = 60000; // Cleanup every minute

// const requestLogs = {};

// // Periodic cleanup function
// function cleanupLogs() {
//     const currentTime = Date.now();
//     for (const ip in requestLogs) {
//         requestLogs[ip] = requestLogs[ip].filter(
//             timestamp => currentTime - timestamp < TIME_WINDOW
//         );
//         if (requestLogs[ip].length === 0) {
//             delete requestLogs[ip]; // Remove inactive clients
//         }
//     }
// }

// setInterval(cleanupLogs, CLEANUP_INTERVAL);

// function rateLimiter(req, res, next) {
//     const clientIP = req.ip;
//     const currentTime = Date.now();

//     if (!requestLogs[clientIP]) {
//         requestLogs[clientIP] = [];
//     }

//     // Filter old timestamps (optional here since periodic cleanup handles most of it)
//     requestLogs[clientIP] = requestLogs[clientIP].filter(
//         timestamp => currentTime - timestamp < TIME_WINDOW
//     );

//     if (requestLogs[clientIP].length < RATE_LIMIT) {
//         requestLogs[clientIP].push(currentTime);
//         next();
//     } else {
//         res.status(429).send('Too Many Requests');
//     }
// }

// app.use(rateLimiter);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

export { throttle, throttleWLastCall, throttleCallLast };
