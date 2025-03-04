import { Readable } from "stream";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

// Main thread code
if (isMainThread) {
    // Sample word list
    const words = [
        "listen", "silent", "inlets", 
        "hello", "world", 
        "dormitory", "dirtyroom"
    ];

    // Function to split array into chunks for parallel processing
    function chunkArray<T>(array: T[], chunkSize: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    // Create a Readable stream from the word list
    const wordStream = Readable.from(words);

    // Number of workers (e.g., based on CPU cores or a fixed number)
    const numWorkers = 2; // Adjust based on your system
    const wordChunks = chunkArray(words, Math.ceil(words.length / numWorkers));
    const workers: Worker[] = [];
    const results: Map<string, string[]> = new Map();

    // Process to collect results from workers
    let completedWorkers = 0;

    // Spawn workers
    wordChunks.forEach((chunk, index) => {
        const worker = new Worker(__filename, { workerData: chunk });
        workers.push(worker);

        worker.on("message", (workerResult: [string, string[]][]) => {
            workerResult.forEach(([key, group]) => {
                if (results.has(key)) {
                    results.set(key, [...results.get(key)!, ...group]);
                } else {
                    results.set(key, group);
                }
            });

            completedWorkers++;
            if (completedWorkers === numWorkers) {
                // All workers done, filter and display anagram groups
                console.log("Anagram Groups:");
                for (const [_, group] of results) {
                    if (group.length > 1) { // Only show groups with multiple words
                        console.log(group);
                    }
                }
            }
        });

        worker.on("error", (err) => console.error(`Worker ${index} error:`, err));
        worker.on("exit", (code) => {
            if (code !== 0) console.error(`Worker ${index} exited with code ${code}`);
        });
    });

    // Feed the stream to trigger processing (though workers handle chunks directly here)
    wordStream.on("data", (word) => {
        // In a real stream-heavy setup, you'd pipe this to workers
        // Here, we're pre-chunking for simplicity
    });

    wordStream.on("end", () => {
        // Stream end doesn’t directly control workers in this example
        // Workers finish independently
    });

} else {
    // Worker thread code
    const words: string[] = workerData;

    // Function to get a sorted character key for anagram checking
    function getAnagramKey(word: string): string {
        return word.toLowerCase().split("").sort().join("");
    }

    // Process words in this chunk
    const anagramMap: Map<string, string[]> = new Map();
    words.forEach((word) => {
        const key = getAnagramKey(word);
        if (anagramMap.has(key)) {
            anagramMap.get(key)!.push(word);
        } else {
            anagramMap.set(key, [word]);
        }
    });

    // Send results back to main thread
    const resultArray = Array.from(anagramMap.entries());
    parentPort!.postMessage(resultArray);
}
