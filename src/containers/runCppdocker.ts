import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import { ExecutionResult } from "../Types/ExecutionResult";

const runCpp = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
): Promise<ExecutionResult> => {
  const rawLogChunks: Buffer[] = [];

  // A shell command to create the file, compile it, and then run it with input
  // The C++ code and input are carefully escaped for the shell command
  const runCommand = `
    printf "%s" '${code.replace(/'/g, "'\\''")}' > main.cpp &&
    g++ -o main main.cpp &&
    printf "%s" '${inputTestCase.replace(/'/g, "'\\''")}' | ./main
  `;

  // Create the container with the C++ image and the combined shell command
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
      await cppDockerContainer.kill();
    }
    return { output: error as string, status: "ERROR" };
  } finally {
    await cppDockerContainer.remove();
  }
};

export default runCpp;
