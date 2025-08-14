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
// import runPython from "./containers/runPythonDocker";
const runJavaContainer_1 = __importDefault(require("./containers/runJavaContainer"));
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
    const javaCode = `
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        int number = Integer.parseInt(line);
        System.out.println("Result: " + (number * 2));
    }
}
`;
    // Input for the Java program
    const input = "12";
    (0, runJavaContainer_1.default)(javaCode, input);
});
