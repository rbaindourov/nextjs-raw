function retryRequest(
  promiseFunc: () => Promise<unknown>,
  nrOfRetries: number
): Promise<unknown> {
  return promiseFunc().catch((error) => {
    if (nrOfRetries > 0) return retryRequest(promiseFunc, nrOfRetries--);

    return Promise.reject(error);
  });
}

let hasFailed = false;
function getUserInfo() {
  return new Promise((resolve, reject) => {
    if (!hasFailed) {
      hasFailed = true;
      reject("Exception!");
    } else {
      resolve("Fetched user!");
    }
  });
}
const promise = retryRequest(getUserInfo, 3);
if (promise) {
  promise
    .then((result) => console.log(result))
    .catch(() => console.log("Error!"));
}
module.exports.retryRequest = retryRequest;

/*

function retryRequest(promiseFunc, nrofRetries) {
  return promiseFunc().catch((error) => {
    if (nrofRetries > 0) {
      return retryRequest(promiseFunc, nrofRetries - 1);
    }
    return Promise.reject(error); // Reject if out of retries
  });
}

async function retryRequest(promiseFunc, nrOfRetries) {
  return new Promise((resolve, reject) => {
    function attempt(remainingRetries) {
      promiseFunc()
        .then(resolve)
        .catch((error) => {
          if (remainingRetries > 0) {
            console.log(`Retrying... (${remainingRetries} left)`);
            setTimeout(() => attempt(remainingRetries - 1), 1000); // Delay before retry
          } else {
            reject(error);
          }
        });
    }
    attempt(nrOfRetries);
  });
}



async function retryRequest(promiseFunc, nrofRetries) {
    while (nrofRetries >= 0) {
        try {
            return await promiseFunc(); // Try executing the function
        } catch (error) {
            if (nrofRetries === 0) {
                throw error; // Reject if out of retries
            }
            nrofRetries--; // Decrement the retry count
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function retryRequest(promiseFunc, nrofRetries, delayMs = 100) {
    return promiseFunc().catch((error) => {
        if (nrofRetries > 0) {
            return delay(delayMs) // Wait before retrying
                .then(() => retryRequest(promiseFunc, nrofRetries - 1, delayMs * 2)); // Exponential backoff
        }
        return Promise.reject(error); // Reject if out of retries
    });
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function retryRequest(promiseFunc, nrofRetries, delayMs = 100) {
    return promiseFunc().catch((error) => {
        if (nrofRetries > 0) {
            return delay(delayMs) // Wait before retrying
                .then(() => retryRequest(promiseFunc, nrofRetries - 1, delayMs * 2)); // Exponential backoff
        }
        return Promise.reject(error); // Reject if out of retries
    });
}


function retryRequest(promiseFunc, nrOfRetries) {
  for (let i = 0; i <= nrOfRetries; i++) {
    const result = await promiseFunc();
    if (result) return result;
  }
  throw new Error(`Failed after ${nrOfRetries} retries`);
}


*/
