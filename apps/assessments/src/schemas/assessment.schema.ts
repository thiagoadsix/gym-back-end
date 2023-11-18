import { AssessmentType } from "database";
import { object, string, TypeOf, z } from "zod";

const isValidDate = (dateString: string) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const parts = dateString.match(regex);
  if (!parts) return false;

  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[2], 10) - 1;
  const year = parseInt(parts[3], 10);

  if (year < 1000 || year > 3000 || month < 0 || month > 11) {
    return false;
  }

  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
};
const pollock3MaleSchema = z.object({
  chest: z.number(),
  abdomen: z.number(),
  thigh: z.number(),
});

const pollock3FemaleSchema = z.object({
  triceps: z.number(),
  suprailiac: z.number(),
  thigh: z.number(),
});

const pollock7MaleSchema = z.object({
  chest: z.number(),
  abdomen: z.number(),
  thigh: z.number(),
  subscapular: z.number(),
  axilla: z.number(),
  calf: z.number(),
  triceps: z.number(),
});

const pollock7FemaleSchema = z.object({
  triceps: z.number(),
  suprailiac: z.number(),
  thigh: z.number(),
  subscapular: z.number(),
  axilla: z.number(),
  calf: z.number(),
  abdomen: z.number(),
});

const baseBodyParts = z.object({
  weight: z.number({ required_error: "Weight is required." }),
  triceps: z.number().default(0),
  suprailiac: z.number().default(0),
  thigh: z.number().default(0),
  subscapular: z.number().default(0),
  axilla: z.number().default(0),
  calf: z.number().default(0),
  chest: z.number().default(0),
  abdomen: z.number().default(0),
});

export const createAssessmentSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    studentId: z.string(),
    assessmentType: z.nativeEnum(AssessmentType),
    startDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid birth date format. Format must be YYYY-MM-DD"
      ),
    endDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid birth date format. Format must be YYYY-MM-DD"
      ),
    data: baseBodyParts,
  }),
});

export const getAssessmentsStudentByUserIdSchema = object({
  params: object({
    userId: string({ required_error: "User ID is required" }),
  }),
});

export const getAssessmentsByUserIdSchema = object({
  params: object({
    userId: string({ required_error: "User ID is required" }),
  }),
});

export type Pollock3FemaleSchema = TypeOf<typeof pollock3FemaleSchema>;
export type Pollock3MaleSchema = TypeOf<typeof pollock3MaleSchema>;
export type Pollock7FemaleSchema = TypeOf<typeof pollock7FemaleSchema>;
export type Pollock7MaleSchema = TypeOf<typeof pollock7MaleSchema>;

export type CreateAssessmentInput = TypeOf<
  typeof createAssessmentSchema
>["body"];
export type GetAssessmentsStudentByUserIdInput = TypeOf<
  typeof getAssessmentsStudentByUserIdSchema
>["params"];
export type GetAssessmentsByUserIdInput = TypeOf<
  typeof getAssessmentsByUserIdSchema
>["params"];
