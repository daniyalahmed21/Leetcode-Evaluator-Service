import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import sampleQueue from "../queues/sampleQueue";

// Create a new Express adapter instance
const serverAdapter = new ExpressAdapter();

// Set the base path for the UI (e.g., /admin/queues)
// FIX: The method name should be setBasePath()
serverAdapter.setBasePath("/admin/queues");

// Create the Bull Board with the Express adapter and your queues
createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)], // Add all your queues here
  serverAdapter: serverAdapter,
});

export default serverAdapter.getRouter();
