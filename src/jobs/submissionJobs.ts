import { Job } from "bullmq";
import { IJob } from "../Types/bullMqTypeDefination";
import { SubmissionPayload } from "../Types/submissionPayload";
import { LanguageStrategyFactory } from "../startegies/LanguageStrategyFactory";

export class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle = async (job?: Job): Promise<void> => {
    if (!this.payload || Object.keys(this.payload).length === 0) {
      console.log("No payload received for job:", job?.id);
      return;
    }

    console.log("Processing job with ID:", job?.id);

    for (const key in this.payload) {
      const submission = this.payload[key];
      if (submission) {
        const { code, language, inputCase } = submission;

        console.log(`Executing submission: ${key} (Language: ${language})`);

        const strategy = LanguageStrategyFactory.getStrategy(language);

        if (!strategy) {
          console.log(`Unsupported language: ${language}`);
          continue;
        }

        await strategy.execute(code, inputCase);
      }
    }

    console.log("Job finished.");
  };

  failed = (job?: Job): void => {
    console.log("Job with ID", job?.id, "failed.");
    if (job && job.data) {
      console.error("Failure reason:", job.data);
    }
  };
}
