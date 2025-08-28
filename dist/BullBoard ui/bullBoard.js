"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const submissionQueue_1 = __importDefault(require("../queues/submissionQueue"));
const evaluationQueue_1 = __importDefault(require("../queues/evaluationQueue"));
const serverAdapter = new express_1.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
(0, api_1.createBullBoard)({
    queues: [
        new bullMQAdapter_1.BullMQAdapter(submissionQueue_1.default),
        new bullMQAdapter_1.BullMQAdapter(evaluationQueue_1.default),
    ],
    serverAdapter: serverAdapter,
});
exports.default = serverAdapter.getRouter();
