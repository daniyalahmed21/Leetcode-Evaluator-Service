import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

const runPython = async (
  code: string,
  inputTestCase: string,
  outputTestCase: string,
) => {
  const rawLogChunks: Buffer[] = [];

  // Use a single shell command to write the code and pipe the input
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

  loggerStream.on("data", (chunk: Buffer) => {
    rawLogChunks.push(chunk);
  });

  await new Promise<void>((res) => {
    loggerStream.on("end", () => {
      const fullLogBuffer = Buffer.concat(rawLogChunks);
      const decodedOutput = decodeDockerStream(fullLogBuffer);

      console.log("Stdout:", decodedOutput.stdout);
      console.log("Stderr:", decodedOutput.stderr);
      res();
    });
  });

  await pythonDockerContainer.remove();
};

export default runPython;
