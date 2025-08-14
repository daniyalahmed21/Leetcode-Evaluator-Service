import SubmissionQueue from "../queues/submissionQueue";

export default async function (payload: Record<string, unknown>) {
  await SubmissionQueue.add("Submission Job", payload);
}
