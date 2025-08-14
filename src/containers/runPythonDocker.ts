import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

const runPython = async (code: string, inputTestCase: string) => {
  const rawLogBuffer: Buffer[] = [];

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "python3",
    "-c",
    code,
    "stty -echo",
  ]);
  await pythonDockerContainer.start();

  const loggerStream = await pythonDockerContainer.logs({
    stderr: true,
    stdout: true,
    follow: true,
    timestamps: false,
  });

  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });
  loggerStream.on("end", () => {
    // Concatenate all chunks into a single Buffer.
    const fullLogBuffer = Buffer.concat(rawLogBuffer);

    // Decode the complete buffer.
    const decodedOutput = decodeDockerStream(fullLogBuffer);

    console.log("--- Decoded Container Output ---");
    console.log("Stdout:", decodedOutput.stdout);
    console.log("Stderr:", decodedOutput.stderr);
    console.log("---------------------------------");
  });
 
};

export default runPython;
