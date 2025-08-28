import runCpp from "../containers/runCppDocker";
import { ExecutionResult } from "../Types/ExecutionResult";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class CppStrategy implements ILanguageStrategy {
  async execute(
    code: string,
    input: string,
    output: string,
  ): Promise<ExecutionResult> {
    console.log("Code", code);

    return await runCpp(code, input, output);
  }
}
