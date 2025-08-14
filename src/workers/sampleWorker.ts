import { Job, Worker } from "bullmq";
import { SampleJob } from "../jobs/sampleJobs";
import redisConnection from "../config/redis.config";

export default function SampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log("Sample job worker started", job);
      if (job.name === "SampleJob") {
        console.log("Sample job worker started", job);

        const SampleJobInstance = new SampleJob(job.data);
        SampleJobInstance.handle(job);
        return true;
      }
    },
    { connection: redisConnection },
  );
}
