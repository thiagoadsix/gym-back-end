import { number, object, string, TypeOf } from "zod";

export const createAssessmentPollock3Schema = object({
  body: object({
    chest: number({ required_error: "Chest is required" }),
    abdomen: number({ required_error: "Abdomen is required" }),
    thigh: number({ required_error: "Thigh is required" }),
    triceps: number({ required_error: "Tricep is required" }),
    suprailiac: number({ required_error: "Suprailiac Date is required" }),
    studentId: string({ required_error: "Student ID is required" }),
  }),
});

export const getAssessmentsByUserIdSchema = object({
  params: object({
    userId: string({ required_error: "User ID is required" }),
  }),
});

export type CreateAssessmentPollock3Input = TypeOf<
  typeof createAssessmentPollock3Schema
>["body"];
export type GetAssessmentsByUserIdInput = TypeOf<
  typeof getAssessmentsByUserIdSchema
>["params"];
