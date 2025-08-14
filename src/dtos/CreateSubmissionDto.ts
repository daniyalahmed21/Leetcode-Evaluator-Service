import z from "zod";

export const CreateSubmissionZodSchema = z.object({
  userId: z.string(),
  problemId: z.string(),
  language: z.string(),
  code: z.string(),
});

export type CreateSubmissionDto = z.infer<typeof CreateSubmissionZodSchema>;
