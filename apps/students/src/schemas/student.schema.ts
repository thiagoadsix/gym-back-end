import { GenderType } from "database";
import { nativeEnum, number, object, string, TypeOf } from "zod";

export const createStudentSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    surname: string({ required_error: "Surname is required" }),
    weight: number({ required_error: "Weight is required" }),
    height: number({ required_error: "Height is required" }),
    birthDate: string({ required_error: "Birth Date is required" }),
    city: string({ required_error: "City is required" }),
    state: string({ required_error: "State is required" }),
    gender: nativeEnum(GenderType, { required_error: "Gender is required" }),
    userId: string({ required_error: "User ID is required" }),
  }),
});

export const getStudentSchema = object({
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export const getAllStudentByUserIdSchema = object({
  params: object({
    userId: string({
      required_error: "User ID is required",
    }),
  }),
});

export const deleteStudentSchema = object({
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export type CreateStudentInput = TypeOf<typeof createStudentSchema>["body"];
export type GetStudentInput = TypeOf<typeof getStudentSchema>["params"];
export type GetAllStudentByIdInput = TypeOf<
  typeof getAllStudentByUserIdSchema
>["params"];
export type DeleteStudentInput = TypeOf<typeof deleteStudentSchema>["params"];
