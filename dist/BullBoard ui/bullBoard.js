"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const sampleQueue_1 = __importDefault(require("../queues/sampleQueue"));
// Create a new Express adapter instance
const serverAdapter = new express_1.ExpressAdapter();
// Set the base path for the UI (e.g., /admin/queues)
// FIX: The method name should be setBasePath()
serverAdapter.setBasePath("/admin/queues");
// Create the Bull Board with the Express adapter and your queues
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(sampleQueue_1.default)], // Add all your queues here
    serverAdapter: serverAdapter,
});
exports.default = serverAdapter.getRouter();
