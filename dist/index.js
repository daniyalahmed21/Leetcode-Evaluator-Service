"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = __importDefault(require("./config/server.config"));
const routes_1 = __importDefault(require("./routes"));
// import sampleQueueProducer from "./producer/sampleQueueProducer";
// import SampleWorker from "./workers/sampleWorker";
const bullBoard_1 = __importDefault(require("./BullBoard ui/bullBoard"));
const runCppdocker_1 = __importDefault(require("./containers/runCppdocker"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.use("/admin/queues", bullBoard_1.default);
app.listen(server_config_1.default.PORT, () => {
    console.log(`Server running at http://localhost:${server_config_1.default.PORT}`);
    console.log(`BullMQ Board UI is available at http://localhost:${server_config_1.default.PORT}/admin/queues`);
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
    (0, runCppdocker_1.default)(cppCode, input);
});
