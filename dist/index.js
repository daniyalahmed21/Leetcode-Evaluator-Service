"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = __importDefault(require("./config/server.config"));
const routes_1 = __importDefault(require("./routes"));
const bullBoard_1 = __importDefault(require("./BullBoard ui/bullBoard"));
// import runCpp from "./containers/runCppDocker";
const submissionWorker_1 = __importDefault(require("./workers/submissionWorker"));
// import submissionQueueProducer from "./producer/submissionQueueProducer";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.use("/admin/queues", bullBoard_1.default);
app.listen(server_config_1.default.PORT, () => {
    console.log(`Server running at http://localhost:${server_config_1.default.PORT}`);
    console.log(`BullMQ Board UI is available at http://localhost:${server_config_1.default.PORT}/admin/queues`);
    (0, submissionWorker_1.default)("SubmissionQueue");
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
