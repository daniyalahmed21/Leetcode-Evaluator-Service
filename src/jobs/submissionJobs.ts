import { Job } from "bullmq";
import { IJob } from "../Types/bullMqTypeDefination";
import { SubmissionPayload } from "../Types/submissionPayload";
import runCpp from "../containers/runCppDocker";
import runJava from "../containers/runJavaDocker";
import runPython from "../containers/runPythonDocker";
// Assuming you have similar functions for other languages

export class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  // Making handle async to correctly await the runCpp call
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

        switch (language) {
          case "cpp":
            await runCpp(code, inputCase);
            break;
          case "java":
            await runJava(code, inputCase);
            break;
          case "python":
            await runPython(code, inputCase);
            break;
          default:
            console.log(
              `Unsupported language: ${language} for submission: ${key}`,
            );
            break;
        }
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
