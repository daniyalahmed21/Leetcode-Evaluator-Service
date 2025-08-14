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

/** 
Detailed Data Flow Explanation
Code and Input Preparation:
const trimmedCode = code.trim();: The Python code string is automatically cleaned of any leading/trailing whitespace. This is an important step to prevent IndentationError in Python.
The inputTestCase string "25" is also ready to be sent.

Container Creation (createContainer):

The createContainer function is called to build a new container.

The python3 -c "..." command is set to execute the trimmedCode directly.

Stream Attachment (pythonDockerContainer.attach):

This is the critical step that creates a two-way communication channel.

The attach method returns a single duplex stream (containerStream) that acts as a bridge. Anything written to this stream goes to the container's standard input (stdin), and anything the container writes to standard output (stdout) or standard error (stderr) is received from this stream.

Output Collection (containerStream.on("data")):

A listener is set up on the containerStream. Whenever the container prints something to stdout or stderr, this listener is triggered.

The data from the container arrives in small, raw Buffer chunks (not strings).

rawLogChunks.push(chunk): The listener pushes each of these raw Buffer chunks into the rawLogChunks array for later processing.

Running the Code and Sending Input:

await pythonDockerContainer.start(): The container's main process, running python3, is started.

containerStream.write(inputTestCase): The string "25" is sent to the container's stdin. The Python script is now able to read this data.

containerStream.end(): This signals that no more input will be sent. The Python script's sys.stdin.read() method will complete, allowing it to process the input.

Container Execution and Data Generation:

Inside the container, the Python script reads the "25", converts it to an integer, and performs the calculation.

print(f"Received: {number}"): The string "Received: 25" is written to the container's stdout.

print(f"Result: {number * 2}"): The string "Result: 50" is also written to stdout.

Each of these print statements sends a new Buffer chunk back to the Node.js process, triggering the on("data") listener.

Waiting and Decoding (wait, concat, decodeDockerStream):

await pythonDockerContainer.wait(): The Node.js script pauses here and waits until the container's process has completely finished (which happens after the Python script exits).

Buffer.concat(rawLogChunks): All the small Buffer chunks collected from the on("data") listener are combined into a single, complete Buffer. This raw buffer contains the multiplexed output from both stdout and stderr.

decodeDockerStream(fullLogBuffer): This function takes the raw buffer and, using Docker's stream protocol, separates the stdout and stderr content into two distinct strings.

Final Output and Cleanup:

console.log("Stdout:", decodedOutput.stdout): This prints the complete stdout log, which will be "Received: 25\nResult: 50\n".

console.log("Stderr:", decodedOutput.stderr): This prints the complete stderr log, which will be an empty string in this successful case.

await pythonDockerContainer.remove(): The container is permanently deleted from the system, cleaning up resources.

**/
