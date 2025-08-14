import { Request, Response } from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";

export const addSubmission = (req: Request, res: Response) => {
  const submissionDto = req.body as CreateSubmissionDto;
  res.status(201).json({
    success: true,
    message: "Successfully collected submission",
    error: {},
    data: submissionDto,
  });
};
