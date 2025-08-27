import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, //enable input streams
    AttachStdout: true, //enable output streams
    AttachStderr: true, //enable error streams
    Tty: false, //Disables a pseudo-terminal (TTY), which is suitable for non-interactive commands.
    HostConfig: {
      Memory: 1024 * 1024 * 1024,
    },
    OpenStdin: true, //Keeps the standard input stream open even if no process is attached.
  });

  return container;
}

export default createContainer;
