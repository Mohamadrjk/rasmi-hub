// lib/crawlerQueue.ts
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

export const crawlerQueue = new Queue("crawlerQueue", { connection });

export const crawlerWorker = new Worker(
  "crawlerQueue",
  async (job) => {
    // اینجا کار کراولینگ رو انجام بده
    console.log("Processing job:", job.data);

    // مثلا:
    // 1. fetch داده‌ها از URL
    // 2. پردازش و استخراج اطلاعات
    // 3. ذخیره در DB

    return { success: true };
  },
  { connection }
);
