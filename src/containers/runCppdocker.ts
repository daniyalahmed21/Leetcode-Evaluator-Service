import createContainer from "./containerFactory";
import { CPP_IMAGE, CONTAINER_TIMEOUT_MS } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import { ExecutionResult, ExecutionStatus } from "../Types/ExecutionResult";

const runCpp = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
): Promise<ExecutionResult> => {
  const rawLogChunks: Buffer[] = [];
  const timeout = CONTAINER_TIMEOUT_MS || 5000;

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("TLE"));
    }, timeout);
  });

  const runCommand = `
    printf "%s" '${code.replace(/'/g, "'\\''")}' > main.cpp &&
    g++ -o main main.cpp &&
    printf "%s" '${inputTestCase.replace(/'/g, "'\\''")}' | ./main
  `;

  const cppDockerContainer = await createContainer(CPP_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  await cppDockerContainer.start();

  const loggerStream = await cppDockerContainer.logs({
    stderr: true,
    stdout: true,
    follow: true,
    timestamps: false,
  });

  loggerStream.on("data", (chunk: Buffer) => {
    rawLogChunks.push(chunk);
  });

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
    console.error("Error occurred:", error);
    await cppDockerContainer.kill();

    if (error instanceof Error && error.message === "TLE") {
      return {
        output: "Time Limit Exceeded",
        status: ExecutionStatus.TIME_LIMIT_EXCEEDED,
      };
    }

    return {
      output: (error as Error).message || String(error),
      status: ExecutionStatus.RUNTIME_ERROR,
    };
  } finally {
    await cppDockerContainer.remove();
  }
};

export default runCpp;
