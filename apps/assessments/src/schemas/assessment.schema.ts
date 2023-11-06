import { AssessmentType } from "database";
import { nativeEnum, number, object, string, TypeOf } from "zod";

export const createAssessmentSchema = object({
  body: object({
    chest: number({ required_error: "Chest is required" }),
    abdomen: number({ required_error: "Abdomen is required" }),
    thigh: number({ required_error: "Thigh is required" }),
    triceps: number({ required_error: "Tricep is required" }),
    suprailiac: number({ required_error: "Suprailiac Date is required" }),
    studentId: string({ required_error: "Student ID is required" }),
    assessmentType: nativeEnum(AssessmentType, {
      description: "Assessment Type is required",
    }),
    weight: number({ required_error: "Weight is required" }),
  }),
});

export const getAssessmentsByUserIdSchema = object({
  params: object({
    userId: string({ required_error: "User ID is required" }),
  }),
});

export type CreateAssessmentInput = TypeOf<
  typeof createAssessmentSchema
>["body"];
export type GetAssessmentsByUserIdInput = TypeOf<
  typeof getAssessmentsByUserIdSchema
>["params"];
