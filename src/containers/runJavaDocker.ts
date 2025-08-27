import { decodeDockerStream } from "./dockerHelper";
import createContainer from "./containerFactory";
import { JAVA_IMAGE } from "../utils/constants";

const runJava = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
) => {
  const rawLogChunks: Buffer[] = [];
  console.log(outputTestCase);

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

  await new Promise((res) => {
    loggerStream.on("end", () => {
      const fullLogBuffer = Buffer.concat(rawLogChunks);
      const decodedOutput = decodeDockerStream(fullLogBuffer);

      console.log("Stdout:", decodedOutput.stdout);
      console.log("Stderr:", decodedOutput.stderr);
      res(null);
    });
  });

  await javaDockerContainer.remove();
};

export default runJava;
