import { ExecutionResult } from "../Types/ExecutionResult";
import { PYTHON_IMAGE } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import createContainer from "./containerFactory";

const runPython = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
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

    if (codeResponse.trim() === outputTestCase.trim()) {
      return { output: codeResponse, status: "SUCCESS" };
    } else {
      return { output: codeResponse, status: "WA" };
    }
  } catch (error) {
    console.log("Error occurred", error);
    if (error === "TLE") {
      await pythonDockerContainer.kill();
    }
    return { output: error as string, status: "ERROR" };
  } finally {
    await pythonDockerContainer.remove();
  }
};

export default runPython;
