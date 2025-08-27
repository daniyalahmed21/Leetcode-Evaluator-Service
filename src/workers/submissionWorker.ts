import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { SubmissionJob } from "../jobs/submissionJobs";

export default function SubmissionWorker(queueName: string) {
  new Worker(
    queueName,

    async (job: Job) => {
      if (job.name === "process-submission") {
        const SubmissionJobInstance = new SubmissionJob(job.data);
        SubmissionJobInstance.handle(job);
        return true;
      }
    },
    { connection: redisConnection },
  );
}
