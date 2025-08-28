import runPython from "../containers/runPythonDocker";
import { ExecutionResult } from "../Types/ExecutionResult";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class PythonStrategy implements ILanguageStrategy {
  async execute(
    code: string,
    input: string,
    output: string,
  ): Promise<ExecutionResult> {
    return await runPython(code, input, output);
  }
}
