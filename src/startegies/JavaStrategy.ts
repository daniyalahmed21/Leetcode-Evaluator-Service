import { ExecutionResult } from "../Types/ExecutionResult";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";
import runJava from "../containers/runJavaDocker";

export class JavaStrategy implements ILanguageStrategy {
  async execute(
    code: string,
    input: string,
    output: string,
  ): Promise<ExecutionResult> {
    return await runJava(code, input, output);
  }
}
