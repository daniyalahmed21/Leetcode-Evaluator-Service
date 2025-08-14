import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";

export const validateCreateSubmissionDto =
  (schema: ZodSchema<CreateSubmissionDto>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body });
      next();
    } catch (error) {
      console.log("validateCreateSubmissionDto", error);
      return res.status(400).json({
        success: true,
        data: {},
        error: error,
        message: "Invalid request params recieved",
      });
    }
  };
