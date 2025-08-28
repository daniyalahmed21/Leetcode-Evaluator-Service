export interface ExecutionResult {
  output: string;
  status: ExecutionStatus;
}

export enum ExecutionStatus {
  SUCCESS = "SUCCESS",
  WRONG_ANSWER = "WA",
  RUNTIME_ERROR = "ERROR",
  TIME_LIMIT_EXCEEDED = "TLE",
}
