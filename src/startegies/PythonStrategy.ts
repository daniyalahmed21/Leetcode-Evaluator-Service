import runPython from "../containers/runPythonDocker";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class PythonStrategy implements ILanguageStrategy {
  async execute(code: string, input: string, output: string): Promise<void> {
    return runPython(code, input, output);
  }
}
