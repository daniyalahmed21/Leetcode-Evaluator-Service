import runCpp from "../containers/runCppDocker";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class CppStrategy implements ILanguageStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<void> {
    return runCpp(code, inputTestCase, outputTestCase);
  }
}
