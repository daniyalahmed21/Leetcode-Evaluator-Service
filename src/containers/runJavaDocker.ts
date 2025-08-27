import createContainer from "./containerFactory";
import { JAVA_IMAGE } from "../utils/constants";
import { fetchDecodedStream } from "../utils/fetchDecodedStream";
import { ExecutionResult } from "../Types/ExecutionResult";

const runJava = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
): Promise<ExecutionResult> => {
  const rawLogChunks: Buffer[] = [];

  // A shell command to create the file, compile it, and then run it with input
  // The Java code and input are carefully escaped for the shell command
  const runCommand = `
    printf "%s" '${code.replace(/'/g, "'\\''")}' > Main.java &&
    javac Main.java &&
    printf "%s" '${inputTestCase.replace(/'/g, "'\\''")}' | java Main
  `;

  // Create the container with the Java image and the combined shell command
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
      await javaDockerContainer.kill();
    }
    return { output: error as string, status: "ERROR" };
  } finally {
    await javaDockerContainer.remove();
  }
};

export default runJava;
