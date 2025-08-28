import createContainer from "./containerFactory";
import { JAVA_IMAGE, CONTAINER_TIMEOUT_MS } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import { ExecutionResult, ExecutionStatus } from "../Types/ExecutionResult";

const runJava = async (
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
    printf "%s" '${code.replace(/'/g, "'\\''")}' > Main.java &&
    javac Main.java &&
    printf "%s" '${inputTestCase.replace(/'/g, "'\\''")}' | java Main
  `;

  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  await javaDockerContainer.start();

  const loggerStream = await javaDockerContainer.logs({
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
    await javaDockerContainer.kill();

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
    await javaDockerContainer.remove();
  }
};

export default runJava;
