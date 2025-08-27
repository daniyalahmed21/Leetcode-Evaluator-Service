import { decodeDockerStream } from "./dockerHelper";
import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";

const runCpp = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
) => {
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

  await new Promise((res) => {
    loggerStream.on("end", () => {
      const fullLogBuffer = Buffer.concat(rawLogChunks);
      const decodedOutput = decodeDockerStream(fullLogBuffer);

      console.log("Stdout:", decodedOutput.stdout);
      console.log("Stderr:", decodedOutput.stderr);
      res(null);
    });
  });

  await cppDockerContainer.remove();
};

export default runCpp;
