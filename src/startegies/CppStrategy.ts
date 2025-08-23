import { ILanguageStrategy } from "./ILanguageStrategy";
import runCpp from "../containers/runCppDocker";

export class CppStrategy implements ILanguageStrategy {
  async execute(code: string, input: string): Promise<void> {
    return runCpp(code, input);
  }
}
