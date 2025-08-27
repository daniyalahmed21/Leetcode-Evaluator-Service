import { decodeDockerStream } from "../containers/dockerHelper";

export const fetchDecodedStream = (
  loggerStream: NodeJS.ReadableStream,
  rawLogBuffer: Buffer[],
): Promise<string> => {
  return new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      console.log("Timeout called");
      rej("TLE");
    }, 2000);

    loggerStream.on("end", () => {
      clearTimeout(timeout);

      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);

      if (decodedStream.stderr) {
        rej(decodedStream.stderr);
      } else {
        res(decodedStream.stdout);
      }
    });
  });
};
