import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { decodeDockerStream } from "./dockerHelper";

const runPython = async (code: string, inputTestCase: string) => {
  const rawLogChunks: Buffer[] = [];

  const trimmedCode = code.trim();

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "python3",
    "-c",
    trimmedCode,
  ]);

  const containerStream: NodeJS.ReadWriteStream =
    await pythonDockerContainer.attach({
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true,
    });

  containerStream.on("data", (chunk: Buffer) => {
    rawLogChunks.push(chunk);
  });

  await pythonDockerContainer.start();

  containerStream.write(inputTestCase);
  containerStream.end();

  await pythonDockerContainer.wait();

  const fullLogBuffer = Buffer.concat(rawLogChunks);
  const decodedOutput = decodeDockerStream(fullLogBuffer);

  console.log("Stdout:", decodedOutput.stdout);
  console.log("Stderr:", decodedOutput.stderr);

  await pythonDockerContainer.remove();
};

export default runPython;
