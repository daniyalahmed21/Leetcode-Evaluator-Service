import { ExecutionResult, ExecutionStatus } from "../Types/ExecutionResult";
import { PYTHON_IMAGE } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import createContainer from "./containerFactory";
import { CONTAINER_TIMEOUT_MS } from "../utils/constants";

const runPython = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
): Promise<ExecutionResult> => {
  const rawLogChunks: Buffer[] = [];
  const timeout = CONTAINER_TIMEOUT_MS || 5000;

  // This is a simple fix for TLE: use a race condition with a Promise timeout.
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("TLE")); // Throw a proper Error object
    }, timeout);
  });

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
    const codeResponse: string = await Promise.race([
      fetchDecodedStream(loggerStream, rawLogChunks),
      timeoutPromise,
    ]);

    if (codeResponse.trim() === outputTestCase.trim()) {
      return { output: codeResponse, status: ExecutionStatus.SUCCESS };
    } else {
      return { output: codeResponse, status: ExecutionStatus.WRONG_ANSWER };
    }
  } catch (error) {
    console.log("Error occurred", error);
    await pythonDockerContainer.kill();

    if (error instanceof Error && error.message === "TLE") {
      return {
        output: "Time Limit Exceeded",
        status: ExecutionStatus.TIME_LIMIT_EXCEEDED,
      };
    }

    return {
      output: (error as Error).message,
      status: ExecutionStatus.RUNTIME_ERROR,
    };
  } finally {
    await pythonDockerContainer.remove();
  }
};

export default runPython;
