import express, { Express } from "express";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
// import sampleQueueProducer from "./producer/sampleQueueProducer";
// import SampleWorker from "./workers/sampleWorker";
import bullBoardRouter from "./BullBoard ui/bullBoard";

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
});
