import runPython from "../containers/runPythonDocker";
import { ILanguageStrategy } from "../Types/ILanguageStrategy";

export class PythonStrategy implements ILanguageStrategy {
  async execute(code: string, input: string, output: string): Promise<void> {
    const result = await runPython(code, input);

    if (result.stderr) {
      console.log("❌ Runtime error:", result.stderr);
      return;
    }

    const normalizedStdout = result.stdout.replace(/\s+/g, "");
    const normalizedOutput = output.replace(/\s+/g, "");

    if (normalizedStdout === normalizedOutput) {
      console.log("✅ Passed");
    } else {
      console.log(
        `❌ Failed: Expected "${output}", got "${result.stdout.trim()}"`,
      );
    }
  }
}
