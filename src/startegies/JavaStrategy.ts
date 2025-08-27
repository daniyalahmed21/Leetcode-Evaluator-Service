import { ILanguageStrategy } from "../Types/ILanguageStrategy";
import runJava from "../containers/runJavaDocker";

export class JavaStrategy implements ILanguageStrategy {
  async execute(code: string, input: string, output: string): Promise<void> {
    return runJava(code, input, output);
  }
}
