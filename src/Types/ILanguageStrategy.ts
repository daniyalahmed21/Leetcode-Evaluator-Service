import { ExecutionResult } from "./ExecutionResult";

export interface ILanguageStrategy {
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<ExecutionResult>;
}
