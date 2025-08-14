// submissionRouter.ts
import express from "express";
import { addSubmission } from "../../controllers/submissionController";
import { CreateSubmissionZodSchema } from "../../dtos/CreateSubmissionDto";
import { validateCreateSubmissionDto } from "../../validators/createSubmissionValidator";

const submissionRouter = express.Router();

submissionRouter.post(
  "/",
  validateCreateSubmissionDto(CreateSubmissionZodSchema),
  addSubmission,
);

export default submissionRouter;
