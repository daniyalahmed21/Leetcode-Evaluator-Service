import runCpp from "../containers/runCppDocker";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class CppStrategy implements ILanguageStrategy {
  async execute(code: string, input: string, output: string): Promise<object> {
    return await runCpp(code, input, output);
  }
}
