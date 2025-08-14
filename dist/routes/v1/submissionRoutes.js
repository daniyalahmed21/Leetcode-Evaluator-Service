"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// submissionRouter.ts
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("../../controllers/submissionController");
const CreateSubmissionDto_1 = require("../../dtos/CreateSubmissionDto");
const createSubmissionValidator_1 = require("../../validators/createSubmissionValidator");
const submissionRouter = express_1.default.Router();
submissionRouter.post("/", (0, createSubmissionValidator_1.validateCreateSubmissionDto)(CreateSubmissionDto_1.CreateSubmissionZodSchema), submissionController_1.addSubmission);
exports.default = submissionRouter;
