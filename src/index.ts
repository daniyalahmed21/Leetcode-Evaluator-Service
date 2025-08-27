import express, { Express } from "express";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import bullBoardRouter from "./BullBoard ui/bullBoard";
// import runCpp from "./containers/runCppDocker";
import SubmissionWorker from "./workers/submissionWorker";
// import submissionQueueProducer from "./producer/submissionQueueProducer";
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use("/admin/queues", bullBoardRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server running at http://localhost:${serverConfig.PORT}`);
  console.log(
    `BullMQ Board UI is available at http://localhost:${serverConfig.PORT}/admin/queues`,
  );
  SubmissionWorker("SubmissionQueue");
  //   submissionQueueProducer({
  //     cpp_submission_1: {
  //       code: `
  //   #include <iostream>
  //   int main() {
  //       std::cout << "Hello from C++";
  //       return 0;
  //   }
  //       `,
  //       language: "cpp",
  //       inputCase: "1 2 3",
  //       outputTestCase
  //     },
  //     java_submission_2: {
  //       code: `
  //   public class Main {
  //       public static void main(String[] args) {
  //           System.out.println("Hello from Java");
  //       }
  //   }
  //       `,
  //       language: "java",
  //       inputCase: "",
  //     },
  //     python_submission_3: {
  //       code: `import sys
  // for line in sys.stdin:
  //   print(line.strip())`, // Ensure there is no whitespace before the 'import' line.
  //       language: "python",
  //       inputCase: "this is a test input",
  //     },
  // });
});
