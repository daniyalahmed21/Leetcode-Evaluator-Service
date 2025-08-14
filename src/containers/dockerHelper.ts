import { DockerStreamOutput } from "../Types/dockerStreamOutput";

// This function works by parsing a special, multiplexed binary stream that Docker uses to send container logs.
// Here is a step-by-step explanation:
// 1. The Docker Stream Protocol
// Docker streams stdout and stderr through a single connection. To distinguish between the two, it uses a small 8-byte header before each log message.
// Byte 0: Indicates the stream type. 1 for stdout and 2 for stderr.
// Bytes 1-3: Reserved.
// Bytes 4-7: An integer that specifies the size of the log message that follows.

export function decodeDockerStream(stream: Buffer): DockerStreamOutput {
  let offset = 0;
  const output: DockerStreamOutput = { stderr: "", stdout: "" };

  while (offset < stream.length) {
    const channel = stream.readUInt8(offset);
    const payloadSize = stream.readUInt32BE(offset + 4);

    const payload = stream.toString(
      "utf-8",
      offset + 8,
      offset + 8 + payloadSize,
    );

    if (channel === 1) {
      output.stdout += payload;
    } else if (channel === 2) {
      output.stderr += payload;
    }

    offset += 8 + payloadSize;
  }

  return output;
}
