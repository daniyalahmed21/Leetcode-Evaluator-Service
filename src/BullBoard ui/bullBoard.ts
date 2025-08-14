import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import submissionQueue from "../queues/submissionQueue";

// Create a new Express adapter instance
const serverAdapter = new ExpressAdapter();

// Set the base path for the UI (e.g., /admin/queues)
// FIX: The method name should be setBasePath()
serverAdapter.setBasePath("/admin/queues");

// Create the Bull Board with the Express adapter and your queues
createBullBoard({
  queues: [new BullMQAdapter(submissionQueue)], // Add all your queues here
  serverAdapter: serverAdapter,
});

export default serverAdapter.getRouter();
