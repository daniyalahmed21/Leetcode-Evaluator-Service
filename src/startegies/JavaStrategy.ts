import { ILanguageStrategy } from "./ILanguageStrategy";
import runJava from "../containers/runJavaDocker";

export class JavaStrategy implements ILanguageStrategy {
  async execute(code: string, input: string): Promise<void> {
    return runJava(code, input);
  }
}
