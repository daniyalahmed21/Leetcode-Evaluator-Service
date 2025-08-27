import runCpp from "../containers/runCppDocker";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class CppStrategy implements ILanguageStrategy {
  async execute(code: string, input: string, output: string): Promise<void> {
    return runCpp(code, input, output);
  }
}
