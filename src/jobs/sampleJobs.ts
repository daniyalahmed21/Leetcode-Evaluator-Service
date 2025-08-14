import { Job } from "bullmq";
import { IJob } from "../Types/bullMqTypeDefination";

export class SampleJob implements IJob {
  name: string;
  payload?: Record<string, unknown>;
  constructor(payload: Record<string, unknown>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle = (job?: Job): void => {
    console.log("Handler of the job");
    console.log(job);
    console.log(this.payload);
  };

  failed = (job?: Job): void => {
    console.log("Job failed");
    if (job) {
      console.log(job.id);
    }
  };
}
