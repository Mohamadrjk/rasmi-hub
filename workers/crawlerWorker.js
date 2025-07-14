import { crawlerWorker } from "@/lib/crawlerQueue";

console.log("Crawler worker started");

// خط زیر برای نگه داشتن پروسس (اگر لازم باشه)
process.stdin.resume();
