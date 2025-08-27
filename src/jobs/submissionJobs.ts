import { Job } from "bullmq";
import { IJob } from "../Types/bullMqTypeDefination";
import { SubmissionPayload } from "../Types/submissionPayload";
import { LanguageStrategyFactory } from "../startegies/LanguageStrategyFactory";

export class SubmissionJob implements IJob {
  name: string;
  payload?: SubmissionPayload;

  constructor(payload: SubmissionPayload) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle = async (job?: Job): Promise<void> => {
    if (!this.payload) {
      console.log("No payload received for job:", job?.id);
      return;
    }

    console.log("Processing job with ID:", job?.id);

    const { code, language, inputTestCase, outputTestCase } = this.payload;

    const strategy = LanguageStrategyFactory.getStrategy(language);

    if (!strategy) {
      console.log(`Unsupported language: ${language}`);
      return;
    }

    try {
      await strategy.execute(code, inputTestCase, outputTestCase);
      // ✅ No need to compare again here
    } catch (err) {
      console.error("Error executing submission:", err);
    }
  };

  failed = (job?: Job): void => {
    console.log("Job with ID", job?.id, "failed.");
    if (job && job.data) {
      console.error("Failure reason:", job.data);
    }
  };
}
