import { Job } from "bullmq";
import { IJob } from "../Types/bullMqTypeDefination";
import { SubmissionPayload } from "../Types/submissionPayload";
import { LanguageStrategyFactory } from "../startegies/LanguageStrategyFactory";
import evaluationQueueProducer from "../producer/evaluationQueueProducer";
import { ExecutionResult, ExecutionStatus } from "../Types/ExecutionResult";

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

    const {
      code,
      language,
      inputTestCase,
      outputTestCase,
      userId,
      submissionId,
    } = this.payload;

    const strategy = LanguageStrategyFactory.getStrategy(language);

    if (!strategy) {
      console.log(`Unsupported language: ${language}`);
      return;
    }

    try {
      const response: ExecutionResult = await strategy.execute(
        code,
        inputTestCase,
        outputTestCase,
      );
      evaluationQueueProducer({ response, userId, submissionId });

      if (response.status === ExecutionStatus.SUCCESS) {
        console.log("Code executed successfully");
      } else if (response.status === ExecutionStatus.WRONG_ANSWER) {
        console.log("Code executed, but the output was a wrong answer.");
      } else {
        console.log("Something went wrong with code execution");
      }
      console.log(response);
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
