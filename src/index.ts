import express, { Express } from "express";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
// import sampleQueueProducer from "./producer/sampleQueueProducer";
// import SampleWorker from "./workers/sampleWorker";
import bullBoardRouter from "./BullBoard ui/bullBoard";
// import runPython from "./containers/runPythonDocker";
import runJava from "./containers/runJavaDocker";
import runCpp from "./containers/runCppdocker";

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
  // SampleWorker("SampleQueue");
  // sampleQueueProducer("SampleJob", {
  //   name: "Daniyal Ahmed",
  //   company: "Meta",
  //   position: "SD1",
  //   location: "Remote",
  // });

  //   const code = `
  // x = 10
  // print(x)
  // `;
  //   const input = "10";

  //   runPython(code, input);

  // A simple Java class
  //   const javaCode = `
  // import java.io.BufferedReader;
  // import java.io.InputStreamReader;
  // import java.io.IOException;

  // public class Main {
  //     public static void main(String[] args) throws IOException {
  //         BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
  //         String line = reader.readLine();
  //         int number = Integer.parseInt(line);
  //         System.out.println("Result: " + (number * 2));
  //     }
  // }
  // `;

  //   const input = "12";

  //   runJava(javaCode, input);

  // A simple C++ program
  const cppCode = `
#include <iostream>
#include <string>

int main() {
    std::string line;
    std::getline(std::cin, line);
    try {
        int number = std::stoi(line);
        std::cout << "Result: " << (number * 2) << std::endl;
    } catch (const std::invalid_argument& e) {
        std::cerr << "Invalid input: " << e.what() << std::endl;
    }
    return 0;
}
`;

  // Input for the C++ program
  const input = "10";

  runCpp(cppCode, input);
});
