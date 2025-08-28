import { decodeDockerStream } from "../containers/dockerHelper";

export const fetchDecodedStream = (
  loggerStream: NodeJS.ReadableStream,
  rawLogBuffer: Buffer[],
): Promise<string> => {
  return new Promise((res, rej) => {
    loggerStream.on("end", () => {
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);

      if (decodedStream.stderr) {
        rej(new Error(decodedStream.stderr));
      } else {
        res(decodedStream.stdout);
      }
    });

    loggerStream.on("error", (err) => {
      rej(err);
    });
  });
};
