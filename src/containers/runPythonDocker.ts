import { PYTHON_IMAGE } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import createContainer from "./containerFactory";

interface ExecutionResult {
  stdout: string;
  stderr: string;
}

const runPython = async (
  code: string,
  inputTestCase: string,
): Promise<ExecutionResult> => {
  const rawLogChunks: Buffer[] = [];

  const runCommand = `
    printf "%s" '${code.trim().replace(/'/g, "'\\''")}' > test.py &&
    printf "%s" '${inputTestCase.replace(/'/g, "'\\''")}' | python3 test.py
  `;

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  await pythonDockerContainer.start();

  const loggerStream = await pythonDockerContainer.logs({
    stderr: true,
    stdout: true,
    follow: true,
    timestamps: false,
  });

  loggerStream.on("data", (chunk: Buffer) => rawLogChunks.push(chunk));

  try {
    const codeResponse: string = await fetchDecodedStream(
      loggerStream,
      rawLogChunks,
    );
    console.log("codeResponse", codeResponse);
    return { stdout: codeResponse, stderr: "" };
  } catch (error) {
    return { stdout: "", stderr: error?.toString?.() || "Unknown error" };
  } finally {
    await pythonDockerContainer.remove();
  }
};

export default runPython;
